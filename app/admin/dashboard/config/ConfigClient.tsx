"use client";

import { useState, useEffect } from "react";
import { NavLink } from "@/lib/data/nav-links";
import { SocialLink } from "@/lib/data/social-links";
import { Expertise } from "@/lib/data/expertise";
import { 
  createNavLink, updateNavLink, deleteNavLink,
  createSocialLink, updateSocialLink, deleteSocialLink,
  createExpertise, updateExpertise, deleteExpertise
} from "@/lib/api";
import { useRouter } from "next/navigation";
import { showToast } from "@/components/ui";

export default function ConfigClient({ 
  initialNavLinks, 
  initialSocialLinks, 
  initialExpertise 
}: { 
  initialNavLinks: NavLink[], 
  initialSocialLinks: SocialLink[], 
  initialExpertise: Expertise[] 
}) {
  const router = useRouter();
  
  // States
  const [navLinks, setNavLinks] = useState(initialNavLinks);
  const [socialLinks, setSocialLinks] = useState(initialSocialLinks);
  const [expertise, setExpertise] = useState(initialExpertise);
  
  const [loading, setLoading] = useState(false);

  // Nav Form State
  const [editingNav, setEditingNav] = useState<NavLink | null>(null);
  const [navForm, setNavForm] = useState<Partial<NavLink>>({ label: "", href: "", order_index: 0 });

  // Social Form State
  const [editingSocial, setEditingSocial] = useState<SocialLink | null>(null);
  const [socialForm, setSocialForm] = useState<Partial<SocialLink>>({ label: "", href: "", order_index: 0 });

  // Expertise Form State
  const [editingExpertise, setEditingExpertise] = useState<Expertise | null>(null);
  const [expertiseForm, setExpertiseForm] = useState<Partial<Expertise>>({ label: "", order_index: 0 });

  // Sync Props
  useEffect(() => {
    setNavLinks(initialNavLinks);
    setSocialLinks(initialSocialLinks);
    setExpertise(initialExpertise);
  }, [initialNavLinks, initialSocialLinks, initialExpertise]);

  // Handlers - Nav Links
  const handleNavDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteNavLink(id);
      showToast("Nav link deleted");
      router.refresh();
    } catch (err: any) { showToast(err.message, "error"); }
  };

  const handleNavSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingNav) { await updateNavLink(editingNav.id, navForm as Record<string, unknown>); showToast("Nav link updated"); }
      else { await createNavLink(navForm as Record<string, unknown>); showToast("Nav link created"); }
      setEditingNav(null);
      setNavForm({ label: "", href: "", order_index: 0 });
      router.refresh();
    } catch (err: any) { showToast(err.message, "error"); }
    finally { setLoading(false); }
  };

  // Handlers - Social Links
  const handleSocialDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteSocialLink(id);
      showToast("Social link deleted");
      router.refresh();
    } catch (err: any) { showToast(err.message, "error"); }
  };

  const handleSocialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingSocial) { await updateSocialLink(editingSocial.id, socialForm as Record<string, unknown>); showToast("Social link updated"); }
      else { await createSocialLink(socialForm as Record<string, unknown>); showToast("Social link created"); }
      setEditingSocial(null);
      setSocialForm({ label: "", href: "", order_index: 0 });
      router.refresh();
    } catch (err: any) { showToast(err.message, "error"); }
    finally { setLoading(false); }
  };

  // Handlers - Expertise
  const handleExpertiseDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteExpertise(id);
      showToast("Expertise deleted");
      router.refresh();
    } catch (err: any) { showToast(err.message, "error"); }
  };

  const handleExpertiseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingExpertise) { await updateExpertise(editingExpertise.id, expertiseForm as Record<string, unknown>); showToast("Expertise updated"); }
      else { await createExpertise(expertiseForm as Record<string, unknown>); showToast("Expertise created"); }
      setEditingExpertise(null);
      setExpertiseForm({ label: "", order_index: 0 });
      router.refresh();
    } catch (err: any) { showToast(err.message, "error"); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex flex-col gap-12">
      
      {/* Navigation Links */}
      <div className="border border-black/20 p-6 bg-white shadow-[4px_4px_0_rgba(0,0,0,0.05)]">
        <h2 className="font-mono text-sm uppercase tracking-widest mb-6 border-b border-black/10 pb-2">Navigation Links</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="border border-black/20 divide-y divide-black/20">
            {navLinks.sort((a,b)=>a.order_index-b.order_index).map((n) => (
              <div key={n.id} className="p-3 flex justify-between items-center hover:bg-black/[0.02]">
                <div className="flex flex-col">
                  <span className="font-sans uppercase text-sm">{n.label}</span>
                  <span className="font-mono text-[10px] text-black/50">{n.href} (Order: {n.order_index})</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => { setEditingNav(n); setNavForm(n); }} className="font-mono text-[10px] uppercase text-black/60 hover:text-black">Edit</button>
                  <button onClick={() => handleNavDelete(n.id)} className="font-mono text-[10px] uppercase text-red-500 hover:text-red-700">Delete</button>
                </div>
              </div>
            ))}
            {navLinks.length === 0 && <div className="p-3 font-mono text-[11px] text-black/50">No navigation links.</div>}
          </div>
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-widest mb-4">{editingNav ? "Edit Nav Link" : "New Nav Link"}</h3>
            <form onSubmit={handleNavSubmit} className="space-y-3">
              <input type="text" placeholder="Label (e.g. About)" value={navForm.label || ""} onChange={e => setNavForm({...navForm, label: e.target.value})} className="w-full border-b border-black/20 py-1 font-mono text-xs focus:outline-none focus:border-black" required />
              <input type="text" placeholder="URL Path (e.g. /about)" value={navForm.href || ""} onChange={e => setNavForm({...navForm, href: e.target.value})} className="w-full border-b border-black/20 py-1 font-mono text-xs focus:outline-none focus:border-black" required />
              <input type="number" placeholder="Order Index" value={navForm.order_index || 0} onChange={e => setNavForm({...navForm, order_index: Number(e.target.value)})} className="w-full border-b border-black/20 py-1 font-mono text-xs focus:outline-none focus:border-black" required />
              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={loading} className="px-4 py-2 bg-black text-white font-mono text-[10px] uppercase tracking-widest hover:bg-black/80">{loading ? "..." : "Save"}</button>
                {editingNav && <button type="button" onClick={() => { setEditingNav(null); setNavForm({label: "", href: "", order_index: 0}); }} className="px-4 py-2 border border-black/20 font-mono text-[10px] uppercase tracking-widest hover:bg-black/5">Cancel</button>}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="border border-black/20 p-6 bg-white shadow-[4px_4px_0_rgba(0,0,0,0.05)]">
        <h2 className="font-mono text-sm uppercase tracking-widest mb-6 border-b border-black/10 pb-2">Social Links</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="border border-black/20 divide-y divide-black/20">
            {socialLinks.sort((a,b)=>a.order_index-b.order_index).map((s) => (
              <div key={s.id} className="p-3 flex justify-between items-center hover:bg-black/[0.02]">
                <div className="flex flex-col">
                  <span className="font-sans uppercase text-sm">{s.label}</span>
                  <span className="font-mono text-[10px] text-black/50">{s.href} (Order: {s.order_index})</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => { setEditingSocial(s); setSocialForm(s); }} className="font-mono text-[10px] uppercase text-black/60 hover:text-black">Edit</button>
                  <button onClick={() => handleSocialDelete(s.id)} className="font-mono text-[10px] uppercase text-red-500 hover:text-red-700">Delete</button>
                </div>
              </div>
            ))}
            {socialLinks.length === 0 && <div className="p-3 font-mono text-[11px] text-black/50">No social links.</div>}
          </div>
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-widest mb-4">{editingSocial ? "Edit Social Link" : "New Social Link"}</h3>
            <form onSubmit={handleSocialSubmit} className="space-y-3">
              <input type="text" placeholder="Label (e.g. GitHub)" value={socialForm.label || ""} onChange={e => setSocialForm({...socialForm, label: e.target.value})} className="w-full border-b border-black/20 py-1 font-mono text-xs focus:outline-none focus:border-black" required />
              <input type="url" placeholder="URL (e.g. https://github.com/...)" value={socialForm.href || ""} onChange={e => setSocialForm({...socialForm, href: e.target.value})} className="w-full border-b border-black/20 py-1 font-mono text-xs focus:outline-none focus:border-black" required />
              <input type="number" placeholder="Order Index" value={socialForm.order_index || 0} onChange={e => setSocialForm({...socialForm, order_index: Number(e.target.value)})} className="w-full border-b border-black/20 py-1 font-mono text-xs focus:outline-none focus:border-black" required />
              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={loading} className="px-4 py-2 bg-black text-white font-mono text-[10px] uppercase tracking-widest hover:bg-black/80">{loading ? "..." : "Save"}</button>
                {editingSocial && <button type="button" onClick={() => { setEditingSocial(null); setSocialForm({label: "", href: "", order_index: 0}); }} className="px-4 py-2 border border-black/20 font-mono text-[10px] uppercase tracking-widest hover:bg-black/5">Cancel</button>}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Expertise */}
      <div className="border border-black/20 p-6 bg-white shadow-[4px_4px_0_rgba(0,0,0,0.05)]">
        <h2 className="font-mono text-sm uppercase tracking-widest mb-6 border-b border-black/10 pb-2">Expertise</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="border border-black/20 divide-y divide-black/20">
            {expertise.sort((a,b)=>a.order_index-b.order_index).map((eItem) => (
              <div key={eItem.id} className="p-3 flex justify-between items-center hover:bg-black/[0.02]">
                <div className="flex flex-col">
                  <span className="font-sans uppercase text-sm">{eItem.label}</span>
                  <span className="font-mono text-[10px] text-black/50">(Order: {eItem.order_index})</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => { setEditingExpertise(eItem); setExpertiseForm(eItem); }} className="font-mono text-[10px] uppercase text-black/60 hover:text-black">Edit</button>
                  <button onClick={() => handleExpertiseDelete(eItem.id)} className="font-mono text-[10px] uppercase text-red-500 hover:text-red-700">Delete</button>
                </div>
              </div>
            ))}
            {expertise.length === 0 && <div className="p-3 font-mono text-[11px] text-black/50">No expertise listed.</div>}
          </div>
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-widest mb-4">{editingExpertise ? "Edit Expertise" : "New Expertise"}</h3>
            <form onSubmit={handleExpertiseSubmit} className="space-y-3">
              <input type="text" placeholder="Label (e.g. Frontend Development)" value={expertiseForm.label || ""} onChange={e => setExpertiseForm({...expertiseForm, label: e.target.value})} className="w-full border-b border-black/20 py-1 font-mono text-xs focus:outline-none focus:border-black" required />
              <input type="number" placeholder="Order Index" value={expertiseForm.order_index || 0} onChange={e => setExpertiseForm({...expertiseForm, order_index: Number(e.target.value)})} className="w-full border-b border-black/20 py-1 font-mono text-xs focus:outline-none focus:border-black" required />
              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={loading} className="px-4 py-2 bg-black text-white font-mono text-[10px] uppercase tracking-widest hover:bg-black/80">{loading ? "..." : "Save"}</button>
                {editingExpertise && <button type="button" onClick={() => { setEditingExpertise(null); setExpertiseForm({label: "", order_index: 0}); }} className="px-4 py-2 border border-black/20 font-mono text-[10px] uppercase tracking-widest hover:bg-black/5">Cancel</button>}
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}
