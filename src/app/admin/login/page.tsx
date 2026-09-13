import { adminLoginAction } from "@/app/actions/auth";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form action={adminLoginAction} className="w-full max-w-sm space-y-4 rounded-3xl border border-border bg-paper p-8">
        <h1 className="font-display text-2xl">კურსი · ადმინი</h1>
        {error && <p className="text-sm text-danger">{error}</p>}
        <input name="email" type="text" required placeholder="email" className="w-full rounded-xl border border-border px-3 py-2" />
        <input name="password" type="password" required placeholder="password" className="w-full rounded-xl border border-border px-3 py-2" />
        <button className="w-full rounded-full bg-pine py-2.5 text-white">შესვლა</button>
      </form>
    </div>
  );
}
