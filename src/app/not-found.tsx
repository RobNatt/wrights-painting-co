import Link from "next/link";
import { CallButton } from "@/components/PhoneLink";

export default function NotFound() {
  return (
    <section id="quote" className="mx-auto max-w-[1200px] px-5 py-20 lg:px-8 lg:py-28">
      <p className="text-eyebrow">Page not found</p>
      <h1 className="text-h1 mt-3 max-w-[20ch]">That page isn’t here, but Mo is.</h1>
      <p className="mt-4 max-w-[34rem] text-slate">
        Call him about your job, or head back to the{" "}
        <Link href="/" className="link">
          home page
        </Link>
        .
      </p>
      <div className="mt-7">
        <CallButton />
      </div>
    </section>
  );
}
