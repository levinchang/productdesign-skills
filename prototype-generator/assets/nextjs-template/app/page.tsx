import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl p-8">
      <section className="rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Spec-driven Prototype Template</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Use this Next.js scaffold as the baseline for feature-level prototype generation.
        </p>
        <div className="mt-6">
          <Link
            href="/(prototype)/alerts"
            className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Open Alerts Prototype
          </Link>
        </div>
      </section>
    </main>
  );
}
