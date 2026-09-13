import { setUserRoleAction } from "@/app/actions/admin";
import { StatusBadge } from "@/components/StatusBadge";
import { adminListProfiles } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function AdminUsersPage() {
  const users = await adminListProfiles();
  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl">მომხმარებლები</h1>
      <div className="divide-y divide-border rounded-2xl border border-border bg-paper">
        {users.map((u) => (
          <div key={u.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm">
            <div>
              <p className="font-medium">{u.full_name || u.id.slice(0, 8)}</p>
              <p className="text-xs text-muted-foreground">{formatDate(u.created_at, "ka")}</p>
            </div>
            <StatusBadge status={u.role} />
            <form action={setUserRoleAction} className="flex gap-2">
              <input type="hidden" name="id" value={u.id} />
              <select name="role" defaultValue={u.role} className="rounded-lg border border-border px-2 py-1">
                <option value="client">client</option>
                <option value="company">company</option>
                <option value="admin">admin</option>
              </select>
              <button className="rounded-full bg-pine px-3 py-1 text-white">OK</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
