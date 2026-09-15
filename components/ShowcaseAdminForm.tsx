"use client";

import { useEffect, useState } from "react";
import { projects, type Project } from "@/lib/data";
import { SHOWCASE_STORAGE_KEY } from "@/components/ShowcaseGallery";

const emptyProject: Project = {
  client: "",
  location: "",
  servicesPerformed: [],
  duration: "",
  summary: "",
  tone: "moss",
};

export default function ShowcaseAdminForm() {
  const [items, setItems] = useState<Project[]>(projects);
  const [draft, setDraft] = useState<Project>(emptyProject);
  const [servicesText, setServicesText] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(SHOWCASE_STORAGE_KEY);
    if (stored) setItems(JSON.parse(stored));
  }, []);

  function updateDraft(field: keyof Project, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setSaved(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = { ...draft, servicesPerformed: servicesText.split(",").map((service) => service.trim()).filter(Boolean) };
    if (!next.client || !next.location || !next.servicesPerformed.length || !next.summary) return;

    const updated = [next, ...items];
    setItems(updated);
    window.localStorage.setItem(SHOWCASE_STORAGE_KEY, JSON.stringify(updated));
    setDraft(emptyProject);
    setServicesText("");
    setSaved(true);
  }

  function removeProject(index: number) {
    const updated = items.filter((_, itemIndex) => itemIndex !== index);
    setItems(updated);
    window.localStorage.setItem(SHOWCASE_STORAGE_KEY, JSON.stringify(updated));
  }

  function resetProjects() {
    setItems(projects);
    window.localStorage.setItem(SHOWCASE_STORAGE_KEY, JSON.stringify(projects));
  }

  return (
    <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.75fr)]">
      <form onSubmit={handleSubmit} className="grid gap-5 border-t border-moss/20 pt-6">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-moss">Add a project</p>
          <p className="mt-1 text-sm text-ink/60">Publish a new case study to the public Our Work page.</p>
        </div>
        <AdminField label="Client or project name">
          <input className="input" required value={draft.client} onChange={(event) => updateDraft("client", event.target.value)} placeholder="e.g. The Fern House" />
        </AdminField>
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminField label="Location"><input className="input" required value={draft.location} onChange={(event) => updateDraft("location", event.target.value)} placeholder="Bandra, Mumbai" /></AdminField>
          <AdminField label="Duration"><input className="input" required value={draft.duration} onChange={(event) => updateDraft("duration", event.target.value)} placeholder="Completed in 2025" /></AdminField>
        </div>
        <AdminField label="Services (comma separated)"><input className="input" required value={servicesText} onChange={(event) => setServicesText(event.target.value)} placeholder="Plant Styling, Plant Maintenance" /></AdminField>
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminField label="Visual tone">
            <select className="input" value={draft.tone} onChange={(event) => updateDraft("tone", event.target.value)}>
              <option value="moss">Moss</option><option value="sage">Sage</option><option value="ochre">Ochre</option>
            </select>
          </AdminField>
          <div className="flex items-end"><p className="text-xs leading-relaxed text-ink/50">Photography can be connected later without changing the publishing flow.</p></div>
        </div>
        <AdminField label="Project summary"><textarea className="input" required rows={5} value={draft.summary} onChange={(event) => updateDraft("summary", event.target.value)} placeholder="What changed in this space?" /></AdminField>
        <div className="flex items-center gap-4">
          <button type="submit" className="rounded-sm bg-moss px-5 py-3 text-sm text-greige transition-colors hover:bg-moss-dark">Publish project</button>
          {saved && <p className="text-sm text-moss">Published to the showcase.</p>}
        </div>
      </form>

      <aside className="border-t border-moss/20 pt-6">
        <div className="flex items-start justify-between gap-4">
          <div><p className="text-xs uppercase tracking-[0.16em] text-moss">Published work</p><p className="mt-1 text-sm text-ink/60">{items.length} project{items.length === 1 ? "" : "s"} currently visible.</p></div>
          <button type="button" onClick={resetProjects} className="text-xs text-ink/60 underline underline-offset-4 hover:text-moss">Reset defaults</button>
        </div>
        <div className="mt-6 divide-y divide-moss/10 border-y border-moss/10">
          {items.map((item, index) => <div key={`${item.client}-${index}`} className="flex items-center justify-between gap-3 py-4"><div><p className="font-serif text-lg text-ink">{item.client}</p><p className="text-xs text-ink/55">{item.location}</p></div><button type="button" onClick={() => removeProject(index)} className="text-xs text-ink/50 hover:text-red-700">Remove</button></div>)}
        </div>
      </aside>
    </div>
  );
}

function AdminField({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm text-ink/70">{label}<span className="mt-1.5 block">{children}</span></label>;
}