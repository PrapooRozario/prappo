"use client";

import { useState } from "react";
import { updateSiteContent, deleteSiteContent } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function ContentClient({ initialContent }: { initialContent: Record<string, string> }) {
  const router = useRouter();
  const [content, setContent] = useState<Record<string, string>>(initialContent);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [formData, setFormData] = useState({ key: "", value: "" });

  const handleEdit = (key: string, value: string) => {
    setEditingKey(key);
    setFormData({ key, value });
  };

  const handleDelete = async (key: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteSiteContent(key);
      const newContent = { ...content };
      delete newContent[key];
      setContent(newContent);
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      // The API takes PUT /site-content/:key with { value: string }
      await updateSiteContent(formData.key, { value: formData.value });
      router.refresh();
      window.location.reload();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="flex-1">
        <h2 className="font-mono text-sm uppercase tracking-widest mb-4">Existing Content Blocks</h2>
        <div className="border border-black/20 divide-y divide-black/20">
          {Object.entries(content).map(([k, v]) => (
            <div key={k} className="p-4 flex justify-between items-start bg-white hover:bg-black/[0.02] transition-colors gap-4">
              <div className="flex-1 overflow-hidden">
                <div className="font-sans font-medium text-lg mb-1">{k}</div>
                <div className="font-mono text-[11px] text-black/60 whitespace-pre-wrap">{v}</div>
              </div>
              <div className="flex gap-4 shrink-0">
                <button onClick={() => handleEdit(k, v)} className="font-mono text-[11px] uppercase tracking-widest text-black/60 hover:text-black">Edit</button>
                <button onClick={() => handleDelete(k)} className="font-mono text-[11px] uppercase tracking-widest text-red-500 hover:text-red-700">Delete</button>
              </div>
            </div>
          ))}
          {Object.keys(content).length === 0 && <div className="p-4 font-mono text-sm text-black/50">No content found.</div>}
        </div>
      </div>

      <div className="w-full lg:w-[400px]">
        <div className="border border-black/20 p-6 bg-white sticky top-8 shadow-[4px_4px_0_rgba(0,0,0,0.05)]">
          <h2 className="font-mono text-sm uppercase tracking-widest mb-6">{editingKey ? "Edit Content Block" : "New Content Block"}</h2>
          
          {error && <div className="mb-4 p-3 bg-red-50 text-red-500 text-xs font-mono border border-red-200">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-widest text-black/60 mb-1">Key Name</label>
              <input 
                type="text" 
                value={formData.key} 
                onChange={e => setFormData({...formData, key: e.target.value})} 
                className="w-full border-b border-black/20 py-2 font-mono text-sm bg-transparent focus:outline-none focus:border-black" 
                required 
                disabled={!!editingKey} 
              />
              {editingKey && <p className="text-[10px] font-mono mt-1 text-black/40">Key cannot be changed while editing.</p>}
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-widest text-black/60 mb-1">Value / Text</label>
              <textarea 
                value={formData.value} 
                onChange={e => setFormData({...formData, value: e.target.value})} 
                className="w-full border-b border-black/20 py-2 font-mono text-sm bg-transparent focus:outline-none focus:border-black min-h-[150px]" 
                required 
              />
            </div>

            <div className="flex gap-2 pt-4">
              <button type="submit" disabled={loading} className="flex-1 bg-black text-white py-3 font-mono text-[11px] uppercase tracking-widest hover:bg-black/80 transition-colors disabled:opacity-50">
                {loading ? "Saving..." : "Save"}
              </button>
              {editingKey && (
                <button type="button" onClick={() => { setEditingKey(null); setFormData({key: "", value: ""}); }} className="flex-1 border border-black/20 bg-white py-3 font-mono text-[11px] uppercase tracking-widest hover:bg-black/5 transition-colors">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
