"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { services } from "@/lib/data";
import { postJSON } from "@/lib/api";

type Status = "idle" | "submitting" | "success" | "error";

export default function RequestServiceForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("service") ?? "";

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const payload = {
      customerName: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email") || null,
      serviceSlug: form.get("service"),
      address: form.get("address"),
      city: form.get("city"),
      pincode: form.get("pincode"),
      requestedDate: form.get("date"),
      notes: form.get("notes") || null,
    };

    try {
      await postJSON("/api/service-requests", payload);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border-t border-moss/20 pt-8">
        <p className="specimen-tag">Request received</p>
        <h2 className="mt-3 font-serif text-2xl text-ink">
          Thanks — we&apos;ve got your request
        </h2>
        <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-ink/70">
          We&apos;ll contact you shortly to confirm a visit time. No account or
          password needed — you&apos;re all set.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
      <div className="sm:col-span-2 border-b border-moss/15 pb-3">
        <p className="text-xs uppercase tracking-[0.16em] text-moss">Your details</p>
        <p className="mt-1 text-sm text-ink/60">We use these only to confirm your visit.</p>
      </div>
      <Field label="Full name" htmlFor="name">
        <input id="name" name="name" required className="input" />
      </Field>

      <Field label="Phone number" htmlFor="phone">
        <input id="phone" name="phone" type="tel" required className="input" />
      </Field>

      <Field label="Email (optional)" htmlFor="email">
        <input id="email" name="email" type="email" className="input" />
      </Field>

      <Field label="Service" htmlFor="service">
        <select
          id="service"
          name="service"
          required
          defaultValue={preselected}
          className="input"
        >
          <option value="" disabled>
            Choose a service
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </Field>

      <div className="sm:col-span-2 border-b border-moss/15 pb-3 pt-2">
        <p className="text-xs uppercase tracking-[0.16em] text-moss">Visit details</p>
        <p className="mt-1 text-sm text-ink/60">Tell us where the plants need a little attention.</p>
      </div>

      <Field label="Address" htmlFor="address" full>
        <input id="address" name="address" required className="input" />
      </Field>

      <Field label="City" htmlFor="city">
        <input id="city" name="city" required className="input" />
      </Field>

      <Field label="Pincode" htmlFor="pincode">
        <input id="pincode" name="pincode" required className="input" />
      </Field>

      <Field label="Preferred date" htmlFor="date">
        <input id="date" name="date" type="date" required className="input" />
      </Field>

      <Field label="Notes (optional)" htmlFor="notes" full>
        <textarea id="notes" name="notes" rows={4} className="input" />
      </Field>

      {status === "error" && (
        <p className="sm:col-span-2 text-sm text-red-700">{errorMessage}</p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-sm bg-moss px-6 py-3 text-[15px] text-greige transition-all hover:-translate-y-0.5 hover:bg-moss-dark disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Request this visit"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
  full = false,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={htmlFor} className="text-sm text-ink/70">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
