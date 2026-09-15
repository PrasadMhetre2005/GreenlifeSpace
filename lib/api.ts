// Base URL of the Spring Boot backend. Set NEXT_PUBLIC_API_URL in
// .env.local (and in Vercel's project env vars) once the backend is
// deployed, e.g. https://greenlife-spaces-api.onrender.com
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081";

async function requestJSON<T>(path: string, options: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...(options.headers ?? {}) },
    });
  } catch {
    throw new Error("The service is temporarily unavailable. Please confirm the API is deployed and try again.");
  }

  if (!res.ok) {
    const message = await res.text().catch(() => "");
    throw new Error(message || `Request failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export function postJSON<T>(path: string, body: unknown): Promise<T> {
  return requestJSON<T>(path, { method: "POST", body: JSON.stringify(body) });
}

export function getJSON<T>(path: string, adminKey?: string): Promise<T> {
  return requestJSON<T>(path, {
    method: "GET",
    headers: adminKey ? { Authorization: `Bearer ${adminKey}` } : undefined,
  });
}

export function patchJSON<T>(path: string, body: unknown, adminKey?: string): Promise<T> {
  return requestJSON<T>(path, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: adminKey ? { Authorization: `Bearer ${adminKey}` } : undefined,
  });
}

export function loginAdmin(adminKey: string): Promise<{ token: string }> {
  return requestJSON<{ token: string }>("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ adminKey }),
  });
}
