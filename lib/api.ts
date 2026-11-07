// Local .env.local overrides this production fallback during development.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://greenlifespace-1.onrender.com";

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

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export function postJSON<T>(path: string, body: unknown, adminKey?: string): Promise<T> {
  return requestJSON<T>(path, {
    method: "POST",
    body: JSON.stringify(body),
    headers: adminKey ? { Authorization: `Bearer ${adminKey}` } : undefined,
  });
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

export function deleteJSON(path: string, adminKey?: string): Promise<void> {
  return requestJSON<void>(path, {
    method: "DELETE",
    headers: adminKey ? { Authorization: `Bearer ${adminKey}` } : undefined,
  });
}

export function loginAdmin(adminKey: string): Promise<{ token: string }> {
  return requestJSON<{ token: string }>("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ adminKey }),
  });
}
