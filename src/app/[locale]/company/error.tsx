"use client";

export default function CompanyError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <h1 className="font-display text-3xl">Kursi</h1>
      <p className="mt-3 text-muted-foreground">
        Could not load the company dashboard. Try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-pine px-5 py-2 text-white"
      >
        Retry
      </button>
    </div>
  );
}
