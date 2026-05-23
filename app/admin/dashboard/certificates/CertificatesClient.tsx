"use client";

import { useState } from "react";
import { Certificate } from "@/lib/data/certificates";
import { createCertificate, updateCertificate, deleteCertificate, uploadImage } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CertificatesClient({ initialCerts }: { initialCerts: Certificate[] }) {
  const router = useRouter();
  const [certs, setCerts] = useState<Certificate[]>(initialCerts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Certificate>>({
    title: "", issuer: "", year: new Date().getFullYear(), credential_url: "", order_index: 0, image: null
  });

  const handleEdit = (c: Certificate) => {
    setEditingId(c.id);
    setFormData(c);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: "", issuer: "", year: new Date().getFullYear(), credential_url: "", order_index: 0, image: null });
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteCertificate(id);
      setCerts(certs.filter(c => c.id !== id));
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    try {
      setLoading(true);
      const res = await uploadImage(e.target.files[0], "certificates");
      setFormData({ ...formData, image: res.data.publicUrl });
    } catch (err: any) {
      alert("Image upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (editingId) {
        await updateCertificate(editingId, formData as Record<string, unknown>);
      } else {
        await createCertificate(formData as Record<string, unknown>);
      }
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
        <h2 className="font-mono text-sm uppercase tracking-widest mb-4">Existing Certificates</h2>
        <div className="border border-black/20 divide-y divide-black/20">
          {certs.map((c) => (
            <div key={c.id} className="p-4 flex justify-between items-center bg-white hover:bg-black/[0.02] transition-colors">
              <div>
                <div className="font-sans font-medium text-lg uppercase">{c.title}</div>
                <div className="font-mono text-xs text-black/50">{c.issuer} | {c.year}</div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => handleEdit(c)} className="font-mono text-[11px] uppercase tracking-widest text-black/60 hover:text-black">Edit</button>
                <button onClick={() => handleDelete(c.id)} className="font-mono text-[11px] uppercase tracking-widest text-red-500 hover:text-red-700">Delete</button>
              </div>
            </div>
          ))}
          {certs.length === 0 && <div className="p-4 font-mono text-sm text-black/50">No certificates found.</div>}
        </div>
      </div>

      <div className="w-full lg:w-[400px]">
        <div className="border border-black/20 p-6 bg-white sticky top-8 shadow-[4px_4px_0_rgba(0,0,0,0.05)]">
          <h2 className="font-mono text-sm uppercase tracking-widest mb-6">{editingId ? "Edit Certificate" : "New Certificate"}</h2>
          
          {error && <div className="mb-4 p-3 bg-red-50 text-red-500 text-xs font-mono border border-red-200">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-widest text-black/60 mb-1">Title</label>
              <input type="text" value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border-b border-black/20 py-2 font-mono text-sm bg-transparent focus:outline-none focus:border-black" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-widest text-black/60 mb-1">Issuer</label>
                <input type="text" value={formData.issuer || ""} onChange={e => setFormData({...formData, issuer: e.target.value})} className="w-full border-b border-black/20 py-2 font-mono text-sm bg-transparent focus:outline-none focus:border-black" required />
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-widest text-black/60 mb-1">Year</label>
                <input type="number" value={formData.year || ""} onChange={e => setFormData({...formData, year: Number(e.target.value)})} className="w-full border-b border-black/20 py-2 font-mono text-sm bg-transparent focus:outline-none focus:border-black" required />
              </div>
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-widest text-black/60 mb-1">Credential URL (Optional)</label>
              <input type="url" value={formData.credential_url || ""} onChange={e => setFormData({...formData, credential_url: e.target.value})} className="w-full border-b border-black/20 py-2 font-mono text-sm bg-transparent focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-widest text-black/60 mb-1">Order Index</label>
              <input type="number" value={formData.order_index || 0} onChange={e => setFormData({...formData, order_index: Number(e.target.value)})} className="w-full border-b border-black/20 py-2 font-mono text-sm bg-transparent focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-widest text-black/60 mb-1">Image Upload</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full font-mono text-[11px]" />
              {formData.image && <p className="text-[10px] font-mono mt-1 text-black/50 truncate">Current: {formData.image}</p>}
            </div>

            <div className="flex gap-2 pt-4">
              <button type="submit" disabled={loading} className="flex-1 bg-black text-white py-3 font-mono text-[11px] uppercase tracking-widest hover:bg-black/80 transition-colors disabled:opacity-50">
                {loading ? "Saving..." : "Save"}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancel} className="flex-1 border border-black/20 bg-white py-3 font-mono text-[11px] uppercase tracking-widest hover:bg-black/5 transition-colors">
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
