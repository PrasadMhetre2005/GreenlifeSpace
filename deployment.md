# Greenlife Spaces Deployment Guide

This guide deploys the PostgreSQL database to Supabase and the Spring Boot API to Render. The Next.js website can remain on Vercel (or another frontend host).

## 1. Create the Supabase database

1. Create a project at [Supabase](https://supabase.com/) and save the database password in a password manager.
2. In the Supabase dashboard, open **SQL Editor** and run `database/schema.sql` once.
3. Run `database/seed.sql` after the schema completes. This inserts the initial service offers and published showcase examples.
4. In **Project Settings > Database**, open the connection options. Use the **Session pooler** connection if the direct database host is not reachable from Render. Copy the pooler host, port, database name, username, and password.

Do not rerun `schema.sql` on an initialized database: it creates types, tables, functions, and triggers that already exist. `seed.sql` can be rerun to refresh the initial offers and showcase examples.

## 2. Add the backend Dockerfile

Render deploys this Java 21 service as a Docker service. Create `backend/Dockerfile` with the following contents:

```dockerfile
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -B -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/greenlife-spaces-api-0.1.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
```

The source repository root for the website is `greenlife-spaces`. The Dockerfile is inside `backend`, so configure Render's root directory as `backend` and its Dockerfile path as `./Dockerfile`.

## 3. Create the Render web service

1. In Render, choose **New > Web Service** and connect the GitHub repository containing this project.
2. Select the branch to deploy.
3. Set **Root Directory** to `backend`.
4. Set **Runtime** to **Docker** and **Dockerfile Path** to `./Dockerfile`.
5. Leave the Docker build and start commands empty; the Dockerfile builds and starts the service.
6. Add the environment variables below under **Environment**. Replace all placeholders with values from Supabase and your frontend deployment.
7. Deploy the service and copy its public HTTPS URL, for example `https://greenlife-spaces-api.onrender.com`.

### Render environment variables

For a Supabase session-pooler connection, use the exact host, port, database, username, and password shown in Supabase. The JDBC URL format is:

```text
DATABASE_URL=jdbc:postgresql://<pooler-host>:<port>/<database>?sslmode=require
DATABASE_USERNAME=<supabase-pooler-username>
DATABASE_PASSWORD=<supabase-database-password>
ADMIN_API_KEY=<long-random-secret>
CORS_ALLOWED_ORIGINS=https://<your-vercel-project>.vercel.app
```

If the website has a custom domain, include it in `CORS_ALLOWED_ORIGINS` as well. Separate multiple origins with commas and no spaces, for example:

```text
CORS_ALLOWED_ORIGINS=https://greenlife-spaces.vercel.app,https://www.example.com
```

Use the configured Supabase connection username as `DATABASE_USERNAME`; with the pooler, this may include the project reference. Keep `DATABASE_PASSWORD` and `ADMIN_API_KEY` private. Do not add either to the Next.js `NEXT_PUBLIC_*` variables or commit them to GitHub.

Render supplies the `PORT` variable. The Spring Boot configuration already listens on `${PORT:8080}`, so do not hard-code a different port.

## 4. Verify the API

After Render reports a successful deployment, open these URLs, replacing the host with your Render URL:

```text
https://<render-service>.onrender.com/actuator/health
https://<render-service>.onrender.com/api/offers
https://<render-service>.onrender.com/api/showcase
```

The health endpoint should return a JSON status of `UP`. Offers should include six seeded services, and showcase should return the seeded published projects. If the database connection fails, check the Supabase host, port, pooler username, password, and `sslmode=require` first.

## 5. Connect the website

In the Vercel project, open **Settings > Environment Variables** and add:

```text
NEXT_PUBLIC_API_URL=https://<render-service>.onrender.com
```

Add it to the environments you deploy (usually Production, Preview, and Development as needed), then redeploy the frontend. The frontend reads this variable in `lib/api.ts`; it must be the Render API base URL without a trailing slash.

The Render value for `CORS_ALLOWED_ORIGINS` must exactly match the website's browser origin, including `https://` and any `www` subdomain. After both deployments, test a service request and an inquiry from the live website.

## 6. Verify admin access

Open `/admin/requests` on the deployed website and sign in with the `ADMIN_API_KEY` value configured on Render. The frontend exchanges this key at `/api/admin/login` and keeps the returned short-lived token in the current browser session. The admin dashboard should then load visit requests and inquiries. The showcase admin page uses the same session token to publish or remove projects.

## Troubleshooting

- **Render deploy fails while building:** confirm the service root is `backend`, the Dockerfile is `backend/Dockerfile`, and the committed Dockerfile matches the Java 21 instructions above.
- **API starts but reports a database error:** verify `DATABASE_URL` starts with `jdbc:postgresql://`, uses the Supabase host/port and database name, and includes `?sslmode=require`. Confirm the pooler username and password are exact.
- **API health is `UP` but browser requests fail:** check that the frontend URL is present in Render's `CORS_ALLOWED_ORIGINS`, with the exact deployed origin, then redeploy the API.
- **Admin sign-in fails:** verify `ADMIN_API_KEY` is set on the Render service, save the change, and redeploy. The admin key is not the Supabase database password.
- **API responds but offers or showcase are empty:** confirm `schema.sql` ran before `seed.sql` in the same Supabase project used by Render.
- **First request is slow:** a sleeping or cold-started Render service may need time to start. Retry the health endpoint after the service wakes.

## Security and operations

- Use HTTPS public URLs and keep database credentials and the admin key in hosting-provider environment settings.
- Rotate the Supabase password or admin key if either is exposed, and update the matching Render variable.
- Configure database backups appropriate to the site's importance and check Supabase's current plan limits before production use.
- The API has `spring.jpa.hibernate.ddl-auto: none`; it will not create or update the database schema on startup. Apply schema changes deliberately through Supabase SQL Editor or a database migration tool.