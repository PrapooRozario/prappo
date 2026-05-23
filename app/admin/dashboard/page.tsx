import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import { Suspense } from "react";

async function DashboardContent() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-black/20">
        <h1 className="text-3xl font-sans uppercase">Dashboard</h1>
        <div className="font-mono text-sm text-black/60 flex items-center">
          Logged in as {session.user.email}
          <LogoutButton />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-black/20 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl mb-2">Projects</h2>
            <p className="text-sm text-black/60 font-mono mb-4">Manage portfolio projects</p>
          </div>
          <Link href="/admin/dashboard/projects" className="bg-black text-white px-4 py-2 font-mono text-sm uppercase text-center hover:bg-black/80 transition-colors">Manage</Link>
        </div>
        
        <div className="border border-black/20 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl mb-2">Certificates</h2>
            <p className="text-sm text-black/60 font-mono mb-4">Manage verified learning</p>
          </div>
          <Link href="/admin/dashboard/certificates" className="bg-black text-white px-4 py-2 font-mono text-sm uppercase text-center hover:bg-black/80 transition-colors">Manage</Link>
        </div>

        <div className="border border-black/20 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl mb-2">Tech Stack</h2>
            <p className="text-sm text-black/60 font-mono mb-4">Manage capabilities</p>
          </div>
          <Link href="/admin/dashboard/tech" className="bg-black text-white px-4 py-2 font-mono text-sm uppercase text-center hover:bg-black/80 transition-colors">Manage</Link>
        </div>

        <div className="border border-black/20 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl mb-2">Content</h2>
            <p className="text-sm text-black/60 font-mono mb-4">Manage site text & links</p>
          </div>
          <Link href="/admin/dashboard/content" className="bg-black text-white px-4 py-2 font-mono text-sm uppercase text-center hover:bg-black/80 transition-colors">Manage</Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-sm text-black/50">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
