import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";

export default async function Settings() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Settings
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Kelola profil dan pengaturan akun Anda.
            </p>
          </div>
          <LogoutButton />
        </header>

        <main className="space-y-4">
          <div className="rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
            <h2 className="text-sm font-medium text-muted-foreground">
              Profil
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Saat ini hanya tampilan saja. Kamu bisa menambahkan form update
              profil di sini nanti.
            </p>
            <div className="mt-3 space-y-1 text-sm">
              <p>
                <span className="font-medium">Email:</span>{" "}
                {user?.email ?? "-"}
              </p>
              <p>
                <span className="font-medium">Nama:</span>{" "}
                {user?.name ?? "-"}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

