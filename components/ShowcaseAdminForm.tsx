"use client";

import { useEffect, useState } from "react";
import { deleteJSON, getJSON, loginAdmin, postJSON } from "@/lib/api";

type ShowcaseRecord = {
  id: string;
  clientName: string;
  location: string;
  duration: string;
  summary: string;
  visualTone: "moss" | "sage" | "ochre";
  status: string;
  services: string[];
};

type ProjectDraft = {
  clientName: string;
  location: string;
  services: string[];
  duration: string;
  summary: string;
  visualTone: "moss" | "sage" | "ochre";
};

const emptyProject: ProjectDraft = {
  clientName: "",
  location: "",
  services: [],
  duration: "",
  summary: "",
  visualTone: "moss",
};
const tokenStorage = "greenlife-admin-token";

export default function ShowcaseAdminForm() {
  const [items, setItems] = useState<ShowcaseRecord[]>([]);
  const [draft, setDraft] = useState<ProjectDraft>(emptyProject);
  const [servicesText, setServicesText] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const storedToken = window.sessionStorage.getItem(tokenStorage) ?? "";
    setToken(storedToken);
    getJSON<ShowcaseRecord[]>("/api/showcase")
      .then(setItems)
      .catch(() => setError("Could not load published projects from the API."));
  }, []);

  function updateDraft(field: keyof ProjectDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setError("");
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    try {
      const result = await loginAdmin(adminKey.trim());
      setToken(result.token);
      window.sessionStorage.setItem(tokenStorage, result.token);
    } catch {
      setError("Access denied. Check the admin key and try again.");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;
    setSaving(true);
    setError("");
    const payload = {
      ...draft,
      services: servicesText.split(",").map((service) => service.trim().toLowerCase()),
    };
    try {
      const created = await postJSON<ShowcaseRecord>("/api/admin/showcase", payload, token);
      setItems((current) => [created, ...current]);
      setDraft(emptyProject);
      setServicesText("");
    } catch {
      setError("The project could not be published. Check service names and sign in again if needed.");
    } finally {
      setSaving(false);
    }
  }

  async function removeProject(id: string) {
    if (!token) return;
    setError("");
    try {
      await deleteJSON(`/api/admin/showcase/${id}`, token);
      setItems((current) => current.filter((item) => item.id !== id));
    } catch {
      setError("The project could not be removed. Sign in again if the session expired.");
    }
  }

  return (
    <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.75fr)]">
      {!token ? <form onSubmit={handleLogin} className="grid max-w-md gap-5 border-t border-moss/20 pt-6">
        <p className="text-xs uppercase tracking-[0.16em] text-moss">Private workspace</p>
        <AdminField label="Admin key"><input className="input" type="password" required autoComplete="current-password" value={adminKey} onChange={(event) => setAdminKey(event.target.value)} /></AdminField>
        <button className="w-fit rounded-sm bg-moss px-5 py-3 text-sm text-greige hover:bg-moss-dark" type="submit">Sign in</button>
      </form> : <form onSubmit={handleSubmit} className="grid gap-5 border-t border-moss/20 pt-6">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-moss">Add a project</p>
          <p className="mt-1 text-sm text-ink/60">Publish a new case study to the public Our Work page.</p>
        </div>
        <AdminField label="Client or project name">
          <input className="input" required value={draft.clientName} onChange={(event) => updateDraft("clientName", event.target.value)} placeholder="e.g. The Fern House" />
        </AdminField>
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminField label="Location"><input className="input" required value={draft.location} onChange={(event) => updateDraft("location", event.target.value)} placeholder="Bandra, Mumbai" /></AdminField>
          <AdminField label="Duration"><input className="input" required value={draft.duration} onChange={(event) => updateDraft("duration", event.target.value)} placeholder="Completed in 2025" /></AdminField>
        </div>
        <AdminField label="Service slugs (comma separated)"><input className="input" required value={servicesText} onChange={(event) => setServicesText(event.target.value)} placeholder="plant-styling, plant-maintenance" /></AdminField>
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminField label="Visual tone">
            <select className="input" value={draft.visualTone} onChange={(event) => updateDraft("visualTone", event.target.value as ProjectDraft["visualTone"])}>
              <option value="moss">Moss</option><option value="sage">Sage</option><option value="ochre">Ochre</option>
            </select>
          </AdminField>
          <div className="flex items-end"><p className="text-xs leading-relaxed text-ink/50">Photography can be connected later without changing the publishing flow.</p></div>
        </div>
        <AdminField label="Project summary"><textarea className="input" required rows={5} value={draft.summary} onChange={(event) => updateDraft("summary", event.target.value)} placeholder="What changed in this space?" /></AdminField>
        <div className="flex items-center gap-4">
          <button disabled={saving} type="submit" className="rounded-sm bg-moss px-5 py-3 text-sm text-greige transition-colors hover:bg-moss-dark disabled:opacity-60">{saving ? "Publishing..." : "Publish project"}</button>
        </div>
      </form>}

      {error && <p role="alert" className="text-sm text-red-700 lg:col-span-2">{error}</p>}

      <aside className="border-t border-moss/20 pt-6">
        <div><p className="text-xs uppercase tracking-[0.16em] text-moss">Published work</p><p className="mt-1 text-sm text-ink/60">{items.length} project{items.length === 1 ? "" : "s"} currently visible.</p></div>
        <div className="mt-6 divide-y divide-moss/10 border-y border-moss/10">
          {items.map((item) => <div key={item.id} className="flex items-center justify-between gap-3 py-4"><div><p className="font-serif text-lg text-ink">{item.clientName}</p><p className="text-xs text-ink/55">{item.location}</p></div>{token && <button type="button" onClick={() => void removeProject(item.id)} className="text-xs text-ink/50 hover:text-red-700">Remove</button>}</div>)}
        </div>
      </aside>
    </div>
  );
}

function AdminField({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm text-ink/70">{label}<span className="mt-1.5 block">{children}</span></label>;
}