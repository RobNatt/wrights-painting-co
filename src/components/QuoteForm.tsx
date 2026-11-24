"use client";

import { useId, useState, type FormEvent } from "react";
import { availableJobTypes, bestTimes, site, type JobType } from "@/config/site";
import { PhoneIcon } from "./icons";

type Fields = { name: string; phone: string; address: string; jobType: string; bestTime: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const digits = (s: string) => s.replace(/\D/g, "");

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Add your name so Mo knows who he's calling.";
  const d = digits(f.phone);
  if (!d) e.phone = "Add a phone number so Mo can call you back.";
  else if (d.length < 10 || d.length > 11) e.phone = "That number looks short. Include the area code.";
  if (!f.address.trim()) e.address = "Add a street address or ZIP so Mo knows where the job is.";
  if (!f.jobType) e.jobType = "Pick the kind of job, or choose Other.";
  return e;
}

/**
 * The quote form (design-system.md 6). Phone is required because Mo calls
 * back. Posts to /api/quote; the success message replaces the form in place.
 */
export function QuoteForm({
  heading = "Get a free quote",
  defaultJobType,
}: {
  heading?: string;
  defaultJobType?: JobType;
}) {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sentTo, setSentTo] = useState<{ name: string; phone: string } | null>(null);
  const jobTypes = availableJobTypes();
  const phone = site.phone.value;

  // Clear a field's error as soon as the visitor edits it.
  function onChange(e: FormEvent<HTMLFormElement>) {
    const name = (e.target as HTMLInputElement).name as keyof Fields;
    if (errors[name]) setErrors(({ [name]: _cleared, ...rest }) => rest);
    if (status === "error") setStatus("idle");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const fields: Fields = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      address: String(data.get("address") ?? ""),
      jobType: String(data.get("jobType") ?? ""),
      bestTime: String(data.get("bestTime") ?? ""),
    };
    const found = validate(fields);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, website: String(data.get("website") ?? ""), page: window.location.pathname }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSentTo({ name: fields.name.trim().split(/\s+/)[0], phone: fields.phone.trim() });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent" && sentTo) {
    return (
      <div role="status" className="py-2">
        <h2 className="text-h2" tabIndex={-1} ref={(el) => el?.focus()}>
          Thanks, {sentTo.name}.
        </h2>
        <p className="mt-3">
          Mo will call you at <span className="font-semibold tabular-nums">{sentTo.phone}</span> to talk through the job.
        </p>
      </div>
    );
  }

  const label = "block text-[0.9375rem] font-semibold";
  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={id(`${k}-err`)} className="mt-1.5 text-[0.9375rem] text-brick">
        {errors[k]}
      </p>
    ) : null;
  const described = (k: keyof Fields) => (errors[k] ? id(`${k}-err`) : undefined);
  const req = <span className="text-brick" aria-hidden="true"> *</span>;

  return (
    <form onSubmit={onSubmit} onChange={onChange} noValidate aria-labelledby={id("h")}>
      <h2 id={id("h")} className="text-h2 lg:text-[1.75rem]">
        {heading}
      </h2>
      <p className="mt-1 text-[0.9375rem] text-slate">No cost and no obligation. Mo calls you back himself.</p>

      <div className="mt-5 space-y-4 lg:mt-4 lg:space-y-3">
        <div>
          <label htmlFor={id("name")} className={label}>
            Name{req}
          </label>
          <input id={id("name")} name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={described("name")} className="field mt-1.5 lg:mt-1 lg:min-h-11" />
          {err("name")}
        </div>

        <div>
          <label htmlFor={id("phone")} className={label}>
            Phone{req}
          </label>
          <input id={id("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="e.g. 910-555-0100" required aria-invalid={!!errors.phone} aria-describedby={described("phone")} className="field mt-1.5 lg:mt-1 lg:min-h-11 tabular-nums" />
          {err("phone")}
        </div>

        <div>
          <label htmlFor={id("address")} className={label}>
            Address or ZIP{req}
          </label>
          <input id={id("address")} name="address" autoComplete="street-address" placeholder="e.g. 28403" required aria-invalid={!!errors.address} aria-describedby={described("address")} className="field mt-1.5 lg:mt-1 lg:min-h-11" />
          {err("address")}
        </div>

        <fieldset aria-invalid={!!errors.jobType} aria-describedby={described("jobType")}>
          <legend className={label}>Type of job{req}</legend>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {jobTypes.map((j) => (
              <label key={j.value} className="relative cursor-pointer">
                <input type="radio" name="jobType" value={j.value} defaultChecked={j.value === defaultJobType} className="peer sr-only" />
                <span className="inline-flex min-h-11 items-center rounded-[4px] border border-input-border bg-paper px-3.5 text-[0.9375rem] font-medium transition-colors duration-150 peer-checked:border-shutter peer-checked:bg-shutter peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-shutter">
                  {j.label}
                </span>
              </label>
            ))}
          </div>
          {err("jobType")}
        </fieldset>

        <div>
          <label htmlFor={id("bestTime")} className={label}>
            Best time to reach you
          </label>
          <select id={id("bestTime")} name="bestTime" defaultValue="Any time" className="field mt-1.5 lg:mt-1 lg:min-h-11">
            {bestTimes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Honeypot: hidden from people, filled in by bots */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("website")}>Leave this empty</label>
          <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <button type="submit" disabled={status === "sending"} className="btn btn-primary mt-6 w-full lg:mt-5 disabled:opacity-70">
        {status === "sending" ? "Sending…" : "Get a free quote"}
      </button>

      {status === "error" ? (
        <p role="alert" className="mt-3 text-[0.9375rem] text-brick">
          That didn’t go through. Please call Mo at{" "}
          <a href={`tel:${phone.tel}`} className="whitespace-nowrap font-semibold underline tabular-nums">
            {phone.display}
          </a>{" "}
          instead.
        </p>
      ) : null}

      <p className="mt-3 flex items-center gap-1.5 text-[0.9375rem] text-slate">
        <PhoneIcon className="h-4 w-4 shrink-0" />
        <span>
          Rather talk now? Call{" "}
          <a href={`tel:${phone.tel}`} className="link whitespace-nowrap font-semibold tabular-nums">
            {phone.display}
          </a>
        </span>
      </p>
    </form>
  );
}
