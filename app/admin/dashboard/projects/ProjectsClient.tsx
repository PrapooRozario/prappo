"use client";

import { useState, useEffect } from "react";
import { Project } from "@/lib/data/projects";
import { createProject, updateProject, deleteProject, uploadImage } from "@/lib/api";
import { useRouter } from "next/navigation";
import { showToast } from "@/components/ui";

export default function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  const [formData, setFormData] = useState<Partial<Project>>({
    title: "", slug: "", number: "", category: "", year: new Date().getFullYear(), description: "", url: "", order_index: 0, image: null
  });

  const handleEdit = (p: Project) => {
    setEditingId(p.id);
    setFormData(p);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: "", slug: "", number: "", category: "", year: new Date().getFullYear(), description: "", url: "", order_index: 0, image: null });
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
      showToast("Project deleted successfully");
      router.refresh();
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    try {
      setLoading(true);
      const res = await uploadImage(e.target.files[0], "projects");
      setFormData({ ...formData, image: res.data.publicUrl });
      showToast("Image uploaded");
    } catch (err: any) {
      showToast("Image upload failed: " + err.message, "error");
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
        await updateProject(editingId, formData as Record<string, unknown>);
        showToast("Project updated successfully");
      } else {
        await createProject(formData as Record<string, unknown>);
        showToast("Project created successfully");
      }
      // Optimistic or refresh
      handleCancel();
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      showToast(err.message, "error");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="flex-1">
        <h2 className="font-mono text-sm uppercase tracking-widest mb-4">Existing Projects</h2>
        <div className="border border-black/20 divide-y divide-black/20">
          {projects.map((p) => (
            <div key={p.id} className="p-4 flex justify-between items-center bg-white hover:bg-black/[0.02] transition-colors">
              <div>
                <div className="font-sans font-medium text-lg uppercase">{p.title}</div>
                <div className="font-mono text-xs text-black/50">/{p.slug} | {p.category} | {p.year}</div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => handleEdit(p)} className="font-mono text-[11px] uppercase tracking-widest text-black/60 hover:text-black">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="font-mono text-[11px] uppercase tracking-widest text-red-500 hover:text-red-700">Delete</button>
              </div>
            </div>
          ))}
          {projects.length === 0 && <div className="p-4 font-mono text-sm text-black/50">No projects found.</div>}
        </div>
      </div>

      <div className="w-full lg:w-[400px]">
        <div className="border border-black/20 p-6 bg-white sticky top-8 shadow-[4px_4px_0_rgba(0,0,0,0.05)]">
          <h2 className="font-mono text-sm uppercase tracking-widest mb-6">{editingId ? "Edit Project" : "New Project"}</h2>
          
          {error && <div className="mb-4 p-3 bg-red-50 text-red-500 text-xs font-mono border border-red-200">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-widest text-black/60 mb-1">Title</label>
              <input type="text" value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border-b border-black/20 py-2 font-mono text-sm bg-transparent focus:outline-none focus:border-black" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-widest text-black/60 mb-1">Slug</label>
                <input type="text" value={formData.slug || ""} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full border-b border-black/20 py-2 font-mono text-sm bg-transparent focus:outline-none focus:border-black" required />
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-widest text-black/60 mb-1">Number</label>
                <input type="text" value={formData.number || ""} onChange={e => setFormData({...formData, number: e.target.value})} className="w-full border-b border-black/20 py-2 font-mono text-sm bg-transparent focus:outline-none focus:border-black" placeholder="e.g. 01" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-widest text-black/60 mb-1">Category</label>
                <input type="text" value={formData.category || ""} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border-b border-black/20 py-2 font-mono text-sm bg-transparent focus:outline-none focus:border-black" required />
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-widest text-black/60 mb-1">Year</label>
                <input type="number" value={formData.year || ""} onChange={e => setFormData({...formData, year: Number(e.target.value)})} className="w-full border-b border-black/20 py-2 font-mono text-sm bg-transparent focus:outline-none focus:border-black" required />
              </div>
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-widest text-black/60 mb-1">Description</label>
              <textarea value={formData.description || ""} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border-b border-black/20 py-2 font-mono text-sm bg-transparent focus:outline-none focus:border-black resize-none" rows={3} />
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-widest text-black/60 mb-1">URL (Optional)</label>
              <input type="url" value={formData.url || ""} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full border-b border-black/20 py-2 font-mono text-sm bg-transparent focus:outline-none focus:border-black" />
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
