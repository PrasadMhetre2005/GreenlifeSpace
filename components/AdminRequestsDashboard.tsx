"use client";

import { useEffect, useMemo, useState } from "react";
import { getJSON, loginAdmin, patchJSON } from "@/lib/api";

type RequestStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";

type ServiceRequest = {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  serviceSlug: string;
  address: string;
  city: string;
  pincode: string;
  requestedDate: string;
  notes?: string;
  status: RequestStatus;
  internalNotes?: string;
  createdAt: string;
};

const statuses: RequestStatus[] = ["pending", "confirmed", "in_progress", "completed", "cancelled"];
const tokenStorage = "greenlife-admin-token";

export default function AdminRequestsDashboard() {
  const [adminKey, setAdminKey] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | RequestStatus>("all");
  const [loginError, setLoginError] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadRequests(key: string) {
    setError("");
    try {
      const data = await getJSON<ServiceRequest[]>("/api/admin/service-requests", key);
      setRequests(data);
      setAuthenticated(true);
      sessionStorage.setItem(tokenStorage, key);
      setAdminToken(key);
      setSelectedId((current) => current ?? data[0]?.id ?? null);
    } catch {
      setAuthenticated(false);
      setLoginError("Access denied. Check the admin key and try again.");
      sessionStorage.removeItem(tokenStorage);
    }
  }

  useEffect(() => {
    const storedKey = sessionStorage.getItem(tokenStorage);
    if (storedKey) {
      void loadRequests(storedKey);
    }
  }, []);

  const visibleRequests = useMemo(
    () => filter === "all" ? requests : requests.filter((request) => request.status === filter),
    [filter, requests],
  );
  const selected = requests.find((request) => request.id === selectedId) ?? null;
  const pendingCount = requests.filter((request) => request.status === "pending").length;
  const confirmedCount = requests.filter((request) => request.status === "confirmed").length;
  const upcomingCount = requests.filter((request) => request.requestedDate >= new Date().toISOString().slice(0, 10) && !["completed", "cancelled"].includes(request.status)).length;

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    void loginAdmin(adminKey.trim())
      .then(({ token }) => loadRequests(token))
      .catch(() => setLoginError("Access denied. Check the admin key and try again."));
  }

  function signOut() {
    sessionStorage.removeItem(tokenStorage);
    setAdminKey("");
    setAdminToken("");
    setAuthenticated(false);
    setRequests([]);
    setSelectedId(null);
  }

  async function saveRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    setSaving(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const updated = await patchJSON<ServiceRequest>(`/api/admin/service-requests/${selected.id}`, {
        status: form.get("status"),
        internalNotes: form.get("internalNotes"),
        }, adminToken);
      setRequests((current) => current.map((request) => request.id === updated.id ? updated : request));
    } catch {
      setError("The request could not be updated. Please sign in again if the key expired.");
    } finally {
      setSaving(false);
    }
  }

  if (!authenticated) {
    return (
      <form onSubmit={handleLogin} className="max-w-md border-t border-moss/20 pt-6">
        <p className="text-xs uppercase tracking-[0.16em] text-moss">Private workspace</p>
        <h2 className="mt-3 font-serif text-3xl text-ink">Admin sign in</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">Use the admin key configured on the Spring Boot server. It is kept in this browser session only.</p>
        <label className="mt-6 block text-sm text-ink/70">Admin key
          <input className="input mt-1.5" type="password" value={adminKey} onChange={(event) => setAdminKey(event.target.value)} required autoComplete="current-password" />
        </label>
        {loginError && <p className="mt-3 text-sm text-red-700">{loginError}</p>}
        <button className="mt-5 rounded-sm bg-moss px-5 py-3 text-sm text-greige hover:bg-moss-dark" type="submit">Open dashboard</button>
      </form>
    );
  }

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-moss/15 pb-6">
        <div><p className="text-xs uppercase tracking-[0.16em] text-moss">Operations overview</p><h2 className="mt-2 font-serif text-3xl text-ink">Visit requests</h2><p className="mt-2 text-sm text-ink/60">Review customers, recommend next steps, and keep every visit moving.</p></div>
        <button type="button" onClick={signOut} className="text-sm text-ink/60 underline underline-offset-4 hover:text-moss">Sign out</button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Metric label="Needs response" value={pendingCount} tone="alert" />
        <Metric label="Confirmed visits" value={confirmedCount} tone="moss" />
        <Metric label="Upcoming active" value={upcomingCount} tone="ochre" />
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <section>
          <div className="flex flex-wrap items-center justify-between gap-3 border-y border-moss/15 py-4"><p className="text-xs uppercase tracking-[0.16em] text-moss">Customer queue ({visibleRequests.length})</p><select className="input w-auto py-2 text-sm" value={filter} onChange={(event) => setFilter(event.target.value as "all" | RequestStatus)}><option value="all">All statuses</option>{statuses.map((status) => <option key={status} value={status}>{formatStatus(status)}</option>)}</select></div>
          <div className="divide-y divide-moss/10">
            {visibleRequests.map((request) => <button key={request.id} type="button" onClick={() => setSelectedId(request.id)} className={`block w-full py-4 text-left ${selectedId === request.id ? "border-l-2 border-moss pl-4" : "pl-0"}`}><div className="flex items-start justify-between gap-3"><div><p className="font-serif text-xl text-ink">{request.customerName}</p><p className="mt-1 text-sm text-ink/60">{formatService(request.serviceSlug)} · {request.city}</p></div><StatusPill status={request.status} /></div><p className="mt-2 text-xs text-ink/50">Requested {formatDate(request.requestedDate)}</p></button>)}
            {!visibleRequests.length && <p className="py-8 text-sm text-ink/60">No requests match this filter.</p>}
          </div>
        </section>

        {selected && <section className="border-t border-moss/20 pt-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs uppercase tracking-[0.16em] text-moss">Request detail</p><h3 className="mt-2 font-serif text-2xl text-ink">{selected.customerName}</h3></div><a className="text-sm text-moss underline underline-offset-4" href={`tel:${selected.phone}`}>Call customer</a></div><div className="mt-5 grid gap-3 text-sm text-ink/75 sm:grid-cols-2"><Detail label="Service" value={formatService(selected.serviceSlug)} /><Detail label="Preferred date" value={formatDate(selected.requestedDate)} /><Detail label="Phone" value={selected.phone} /><Detail label="Email" value={selected.email || "Not provided"} /><Detail label="Address" value={`${selected.address}, ${selected.city} ${selected.pincode}`} /><Detail label="Customer note" value={selected.notes || "No note"} /></div><form onSubmit={saveRequest} className="mt-7 border-t border-moss/15 pt-5"><p className="text-xs uppercase tracking-[0.16em] text-moss">Response and care plan</p><label className="mt-4 block text-sm text-ink/70">Visit status<select name="status" className="input mt-1.5" defaultValue={selected.status}>{statuses.map((status) => <option key={status} value={status}>{formatStatus(status)}</option>)}</select></label><label className="mt-4 block text-sm text-ink/70">Admin response, solution, or suggestion<textarea name="internalNotes" className="input mt-1.5" rows={5} defaultValue={selected.internalNotes || ""} placeholder="Example: Recommend a monthly maintenance visit and indirect light near the reception desk." /></label><button disabled={saving} className="mt-4 rounded-sm bg-moss px-5 py-3 text-sm text-greige hover:bg-moss-dark disabled:opacity-60" type="submit">{saving ? "Saving..." : "Save response"}</button></form></section>}
      </div>
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: number; tone: "alert" | "moss" | "ochre" }) { return <div className={`border-t-2 ${tone === "alert" ? "border-red-700" : tone === "ochre" ? "border-ochre" : "border-moss"} pt-3`}><p className="text-3xl font-serif text-ink">{value}</p><p className="mt-1 text-sm text-ink/60">{label}</p></div>; }
function Detail({ label, value }: { label: string; value: string }) { return <div><p className="text-xs uppercase tracking-[0.12em] text-ink/45">{label}</p><p className="mt-1">{value}</p></div>; }
function StatusPill({ status }: { status: RequestStatus }) { return <span className="shrink-0 border border-moss/20 px-2 py-1 text-[11px] uppercase tracking-[0.1em] text-moss">{formatStatus(status)}</span>; }
function formatStatus(status: string) { return status.replace("_", " "); }
function formatService(slug: string) { return slug.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join(" "); }
function formatDate(value: string) { return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(`${value}T00:00:00`)); }