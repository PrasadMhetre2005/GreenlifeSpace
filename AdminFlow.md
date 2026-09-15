# Admin Flow: Customer Visit Requests

## Current status

Customer visit requests are submitted from `/request-service` and stored in the PostgreSQL `service_requests` table. They start with status `pending`.

The admin dashboard is available at `/admin/requests`. The existing `/admin/showcase` page remains separate and is only for adding showcase projects.

## Dashboard access

1. Start the Spring Boot API on port `8081` and the Next.js website on port `3002`.
2. Open `http://localhost:3002/admin/requests`.
3. Enter the value configured as `ADMIN_API_KEY` on the backend.
4. Select **Open dashboard**.
5. Review the queue, filter by status, and select a customer to see their contact details, service, address, requested date, and notes.
6. Choose a visit status and write the admin response, solution, or care suggestion.
7. Select **Save response**. The update is stored in `service_requests.internal_notes` and the status is saved in the database.

The key is sent as `X-Admin-Key` only to protected admin API requests and is kept in browser session storage until sign out or the session ends.

## Database fallback

If the dashboard is unavailable, an administrator can inspect the database directly.

1. Start PostgreSQL and the Spring Boot API.
2. Open PowerShell in `greenlife-spaces/backend`.
3. Set the database password:

```powershell
$env:PGPASSWORD = "your-local-postgres-password"
```

4. Query the newest customer requests:

```powershell
psql -h localhost -U postgres -d greenlife_spaces -c @"
SELECT
    sr.id,
    sr.customer_name,
    sr.phone,
    sr.email,
    o.name AS service,
    sr.address,
    sr.city,
    sr.pincode,
    sr.requested_date,
    sr.status,
    sr.notes,
    sr.created_at
FROM service_requests sr
JOIN offers o ON o.id = sr.offer_id
ORDER BY sr.created_at DESC;
"@
```

5. To see only requests that still need attention:

```powershell
psql -h localhost -U postgres -d greenlife_spaces -c "
SELECT sr.id, sr.customer_name, sr.phone, o.name AS service,
       sr.city, sr.requested_date, sr.status, sr.created_at
FROM service_requests sr
JOIN offers o ON o.id = sr.offer_id
WHERE sr.status = 'pending'
ORDER BY sr.requested_date, sr.created_at;
"
```

6. Contact the customer using the stored phone number or email, confirm the visit, and record the status change in the database only after verifying the request.

## Status workflow

Use these statuses in order where applicable:

- `pending`: newly submitted and awaiting admin contact
- `confirmed`: visit date and details confirmed with the customer
- `in_progress`: the scheduled service is being delivered
- `completed`: the service visit is finished
- `cancelled`: the request will not be fulfilled

Example status update:

```powershell
$requestId = "CUSTOMER-REQUEST-UUID"
psql -h localhost -U postgres -d greenlife_spaces -c "
UPDATE service_requests
SET status = 'confirmed'
WHERE id = '$requestId';
"
```

Verify the change:

```powershell
psql -h localhost -U postgres -d greenlife_spaces -c "
SELECT id, customer_name, status, requested_date
FROM service_requests
WHERE id = '$requestId';
"
```

## Admin authentication

The backend uses the `X-Admin-Key` header for protected routes under `/api/admin/**`.

Set a strong key before starting the API:

```powershell
$env:ADMIN_API_KEY = "a-long-random-admin-key"
```

The default value `change-me-in-production` must not be used outside local development. Database credentials and the admin key must never be committed to Git or exposed in browser code.

## Admin API flow

The dashboard uses these protected endpoints:

- `GET /api/admin/service-requests` lists requests newest first.
- `PATCH /api/admin/service-requests/{id}` updates the status and internal response/care plan.

Both require the `X-Admin-Key` header. The browser must also be allowed by `CORS_ALLOWED_ORIGINS` on the backend.

## Safety checklist

- Protect all request-list and request-update endpoints with the admin key or a proper user-authentication system.
- Never expose customer requests through public `GET` endpoints.
- Do not log phone numbers, email addresses, or full addresses unnecessarily.
- Validate allowed status transitions on the backend.
- Use parameterized queries or repository methods for all request access.
- Back up the database before manual status updates.
- Remove test requests from production data after verification.
