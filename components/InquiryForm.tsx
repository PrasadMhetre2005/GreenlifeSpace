"use client";

import { useState } from "react";
import { postJSON } from "@/lib/api";

type Status = "idle" | "submitting" | "success" | "error";

export default function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email") || null,
      subject: form.get("subject"),
      message: form.get("message"),
    };

    try {
      await postJSON("/api/inquiries", payload);
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
        <p className="specimen-tag">Message sent</p>
        <h2 className="mt-3 font-serif text-2xl text-ink">
          Thanks for reaching out
        </h2>
        <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-ink/70">
          We reply to most inquiries within a day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className="text-sm text-ink/70">Name</label>
        <input id="name" name="name" required className="input mt-1.5" />
      </div>
      <div>
        <label htmlFor="phone" className="text-sm text-ink/70">Phone</label>
        <input id="phone" name="phone" type="tel" required className="input mt-1.5" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="email" className="text-sm text-ink/70">Email (optional)</label>
        <input id="email" name="email" type="email" className="input mt-1.5" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="subject" className="text-sm text-ink/70">Subject</label>
        <input id="subject" name="subject" required className="input mt-1.5" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="text-sm text-ink/70">Message</label>
        <textarea id="message" name="message" rows={5} required className="input mt-1.5" />
      </div>

      {status === "error" && (
        <p className="sm:col-span-2 text-sm text-red-700">{errorMessage}</p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-sm bg-moss px-6 py-3 text-[15px] text-greige transition-colors hover:bg-moss-dark disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send inquiry"}
        </button>
      </div>
    </form>
  );
}
