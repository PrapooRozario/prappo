"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Corner } from "@/components/ui/Corner";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 relative">
      <div className="absolute inset-0 bg-black/[0.02] pointer-events-none" />
      
      <div className="relative max-w-sm w-full p-10 bg-white border border-black/20 z-10 shadow-[8px_8px_0_rgba(0,0,0,0.05)]">
        <Corner className="-top-[1.5px] -left-[1.5px]" />
        <Corner className="-top-[1.5px] -right-[1.5px]" />
        <Corner className="-bottom-[1.5px] -left-[1.5px]" />
        <Corner className="-bottom-[1.5px] -right-[1.5px]" />

        <div className="font-mono text-[11px] md:text-[13px] uppercase tracking-widest text-black/50 mb-8">
          / Restricted
        </div>

        <h1 className="font-sans text-[32px] md:text-[40px] leading-[0.9] tracking-[-0.04em] text-black uppercase mb-8">
          Admin<br />Access
        </h1>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 mb-6 text-[13px] font-mono border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[13px] font-mono text-black/60 uppercase tracking-widest">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-black/20 bg-transparent py-2 font-mono text-sm focus:outline-none focus:border-black transition-colors"
              required
              placeholder="admin@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[13px] font-mono text-black/60 uppercase tracking-widest">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-black/20 bg-transparent py-2 font-mono text-sm focus:outline-none focus:border-black transition-colors"
              required
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 mt-4 font-mono text-[13px] uppercase tracking-widest hover:bg-black/80 transition-colors disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Enter Portal"}
          </button>
        </form>
      </div>
    </div>
  );
}
