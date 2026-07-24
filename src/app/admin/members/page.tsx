import AdminMembersList from "@/components/admin/AdminMembersList";
import { listAdminMembers } from "@/app/actions/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Members — Admin",
};

export default async function AdminMembersPage() {
  const { members, currentUserId, error } = await listAdminMembers();

  return (
    <div>
      <h2 className="mb-8 font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--fg)]">
        Members
      </h2>
      <AdminMembersList
        members={members}
        currentUserId={currentUserId}
        error={error}
      />
    </div>
  );
}
