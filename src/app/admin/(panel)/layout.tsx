import Link from "next/link";
import { adminLogoutAction } from "@/app/actions/auth";
import { getProfile } from "@/lib/auth";
import { redirect } from "next/navigation";

const links = [
  ["/admin", "მთავარი"],
  ["/admin/users", "მომხმარებლები"],
  ["/admin/companies", "კომპანიები"],
  ["/admin/requests", "ტრანზაქციები"],
  ["/admin/ledger", "ლეჯერი"],
  ["/admin/messages", "შეტყობინებები"],
  ["/admin/settings", "პარამეტრები"],
];

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await getProfile();
  if (!profile || profile.role !== "admin") redirect("/admin/login");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-pine text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <p className="font-display text-xl">კურსი ადმინი</p>
          <form action={adminLogoutAction}>
            <button className="text-sm text-white/70">გასვლა</button>
          </form>
        </div>
      </header>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 lg:flex-row">
        <nav className="flex gap-2 overflow-x-auto lg:w-48 lg:flex-col">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="rounded-full bg-paper px-3 py-2 text-sm">
              {label}
            </Link>
          ))}
        </nav>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
