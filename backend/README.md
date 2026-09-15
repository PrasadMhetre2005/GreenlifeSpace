# Greenlife Spaces API

Spring Boot API for the Greenlife Spaces website. It uses the PostgreSQL schema
in `../database/schema.sql` and seed data in `../database/seed.sql`.

## Run locally

From this directory, set the database password and start the API:

```powershell
$env:DATABASE_PASSWORD = "your-local-postgres-password"
$env:ADMIN_API_KEY = "a-long-local-admin-key"
mvn spring-boot:run
```

The API starts on `http://localhost:8080` by default. If port 8080 is already
in use, start it on another port:

```powershell
$env:PORT = "8081"
mvn spring-boot:run
```

Set the base URL used by the commands below:

```powershell
$baseUrl = "http://localhost:8081"
```

## Public endpoints

- `GET /actuator/health`
- `GET /api/offers`
- `GET /api/showcase`
- `POST /api/service-requests`
- `POST /api/inquiries`

## Protected admin endpoints

Send `X-Admin-Key` with the configured `ADMIN_API_KEY`:

- `POST /api/admin/showcase`
- `PATCH /api/admin/showcase/{id}/publish`

The API validates all visitor input, never returns stack traces, uses stateless
authentication for admin mutations, and only exposes health/info actuator data.

## API testing checklist

Run these checks after the API has started. A successful response should be
JSON, and a failed request should return a useful HTTP status without a stack
trace.

### 1. Health check

Expected: HTTP `200` and status `UP`.

```powershell
Invoke-RestMethod "$baseUrl/actuator/health"
```

### 2. List seeded offers

Expected: HTTP `200` and six offers, ordered by display order.

```powershell
$offers = Invoke-RestMethod "$baseUrl/api/offers"
$offers.Count
$offers | Select-Object slug, name, startingPriceLabel | Format-Table
```

Expected slugs:

- `plant-styling`
- `plant-maintenance`
- `plant-polishing`
- `office-greening`
- `event-styling`
- `plant-doctor`

### 3. Public showcase listing

Expected: HTTP `200` and a JSON array. Only projects with `published` status
are returned.

```powershell
Invoke-RestMethod "$baseUrl/api/showcase"
```

### 4. Create a service request

Expected: HTTP `201`, a UUID `id`, and status `pending`.

```powershell
$serviceRequest = @{
	customerName = "Test Customer"
	phone = "+91 98765 43210"
	email = "test@example.com"
	serviceSlug = "plant-maintenance"
	address = "12 Test Street"
	city = "Pune"
	pincode = "411001"
	requestedDate = (Get-Date).AddDays(7).ToString("yyyy-MM-dd")
	notes = "Backend API test request"
} | ConvertTo-Json

Invoke-RestMethod "$baseUrl/api/service-requests" -Method Post `
	-ContentType "application/json" -Body $serviceRequest
```

### 5. Create a general inquiry

Expected: HTTP `201`, a UUID `id`, and status `new`.

```powershell
$inquiry = @{
	name = "Test Customer"
	phone = "+91 98765 43210"
	email = "test@example.com"
	subject = "API test inquiry"
	message = "Testing the Greenlife Spaces inquiry endpoint."
} | ConvertTo-Json

Invoke-RestMethod "$baseUrl/api/inquiries" -Method Post `
	-ContentType "application/json" -Body $inquiry
```

### 6. Validation failure tests

Expected: HTTP `400`, error code `VALIDATION_ERROR`, and a `fields` object.

```powershell
$invalidRequest = @{ customerName = ""; phone = "bad" } | ConvertTo-Json

try {
	Invoke-RestMethod "$baseUrl/api/service-requests" -Method Post `
		-ContentType "application/json" -Body $invalidRequest
} catch {
	$_.ErrorDetails.Message
}
```

Also test these cases:

- Missing required fields
- Invalid email address
- Invalid phone number
- Invalid pincode
- A service request date in the past
- An unknown `serviceSlug`
- A request body larger than the documented field limits

Unknown service slugs should return HTTP `404` with code `NOT_FOUND`.

### 7. Admin authentication failure

Expected: HTTP `401` when `X-Admin-Key` is missing or incorrect.

```powershell
$project = @{
	clientName = "Unauthorized Test Project"
	location = "Pune"
	duration = "Test"
	summary = "This request should be rejected."
	visualTone = "moss"
	services = @("plant-styling")
} | ConvertTo-Json

try {
	Invoke-RestMethod "$baseUrl/api/admin/showcase" -Method Post `
		-ContentType "application/json" -Body $project
} catch {
	$_.Exception.Response.StatusCode.value__
}
```

### 8. Create and publish showcase work

Set the same admin key used when starting the API. Expected: HTTP `201`, a
published project, and the selected service slugs in the response.

```powershell
$env:ADMIN_API_KEY = "a-long-local-admin-key"
$headers = @{ "X-Admin-Key" = $env:ADMIN_API_KEY }

$project = @{
	clientName = "API Test Project"
	location = "Baner, Pune"
	duration = "Completed in 2026"
	summary = "A test showcase project created through the protected API."
	visualTone = "sage"
	services = @("plant-styling", "plant-maintenance")
} | ConvertTo-Json

$created = Invoke-RestMethod "$baseUrl/api/admin/showcase" -Method Post `
	-Headers $headers -ContentType "application/json" -Body $project
$created

Invoke-RestMethod "$baseUrl/api/showcase"
```

The create endpoint publishes the project immediately. To test the explicit
publish route, create a draft directly in the database, capture its UUID, and
run:

```powershell
$projectId = "00000000-0000-0000-0000-000000000000"
Invoke-RestMethod "$baseUrl/api/admin/showcase/$projectId/publish" `
	-Method Patch -Headers $headers
```

Expected: HTTP `404` for a nonexistent project UUID.

### 9. Invalid showcase services

Expected: HTTP `404` when any service slug does not exist or is inactive.

```powershell
$badProject = @{
	clientName = "Invalid Service Project"
	location = "Pune"
	duration = "Test"
	summary = "This request should fail."
	visualTone = "moss"
	services = @("not-a-real-service")
} | ConvertTo-Json

try {
	Invoke-RestMethod "$baseUrl/api/admin/showcase" -Method Post `
		-Headers $headers -ContentType "application/json" -Body $badProject
} catch {
	$_.ErrorDetails.Message
}
```

### 10. Database verification

After the API tests, confirm that requests and inquiries were persisted:

```powershell
$env:PGPASSWORD = "your-local-postgres-password"
$psql = "C:\Program Files\PostgreSQL\18\bin\psql.exe"

& $psql -h localhost -U postgres -d greenlife_spaces -c `
	"SELECT COUNT(*) AS offers FROM offers; SELECT COUNT(*) AS service_requests FROM service_requests; SELECT COUNT(*) AS inquiries FROM inquiries; SELECT COUNT(*) AS showcase_projects FROM showcase_projects;"
```

Expected: six offers, plus the number of test records created during this run.

### 11. Frontend integration test

Set the frontend API URL to the same port as the running backend:

```powershell
# greenlife-spaces/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8081
```

Restart Next.js after changing `.env.local`, open the frontend, and test:

- Request Service form submits and shows the success state
- Contact form submits and shows the success state
- Service links preselect the requested offer
- The public showcase loads projects from `GET /api/showcase`

### 12. Automated build checks

Run both builds before committing backend changes:

```powershell
Push-Location backend
mvn clean test
Pop-Location

npm run build
```

The backend currently has no automated integration test class, so the manual
HTTP checklist above is required until Testcontainers or a dedicated test
database is added.