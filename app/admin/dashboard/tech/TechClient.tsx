"use client";

import { useState, useEffect } from "react";
import { createTechCategory, updateTechCategory, deleteTechCategory, createTechItem, updateTechItem, deleteTechItem } from "@/lib/api";
import { useRouter } from "next/navigation";
import { showToast } from "@/components/ui";

export default function TechClient({ initialCategories, initialItems }: { initialCategories: any[], initialItems: any[] }) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCategories(initialCategories);
    setItems(initialItems);
  }, [initialCategories, initialItems]);

  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [catFormData, setCatFormData] = useState<any>({ display_id: "", title: "" });

  const [editingItem, setEditingItem] = useState<any>(null);
  const [itemFormData, setItemFormData] = useState<any>({ category_id: "", name: "" });

  const handleCatEdit = (cat: any) => { setEditingCategory(cat); setCatFormData(cat); };
  const handleItemEdit = (item: any) => { setEditingItem(item); setItemFormData(item); };

  const handleCatDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try { await deleteTechCategory(id); setCategories(categories.filter(c => c.id !== id)); showToast("Category deleted"); router.refresh(); } catch (err: any) { showToast(err.message, "error"); }
  };

  const handleItemDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try { await deleteTechItem(id); setItems(items.filter(i => i.id !== id)); showToast("Item deleted"); router.refresh(); } catch (err: any) { showToast(err.message, "error"); }
  };

  const handleCatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      if (editingCategory) { await updateTechCategory(editingCategory.id, catFormData); showToast("Category updated"); }
      else { await createTechCategory(catFormData); showToast("Category created"); }
      setEditingCategory(null);
      setCatFormData({display_id: "", title: ""});
      setLoading(false);
      router.refresh();
    } catch (err: any) { setError(err.message); showToast(err.message, "error"); setLoading(false); }
  };

  const handleItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      if (editingItem) { await updateTechItem(editingItem.id, itemFormData); showToast("Item updated"); }
      else { await createTechItem(itemFormData); showToast("Item created"); }
      setEditingItem(null);
      setItemFormData({category_id: "", name: ""});
      setLoading(false);
      router.refresh();
    } catch (err: any) { setError(err.message); showToast(err.message, "error"); setLoading(false); }
  };

  return (
    <div className="flex flex-col gap-12">
      {error && <div className="p-3 bg-red-50 text-red-500 text-xs font-mono border border-red-200">{error}</div>}

      {/* Categories Section */}
      <div className="border border-black/20 p-6 bg-white shadow-[4px_4px_0_rgba(0,0,0,0.05)]">
        <h2 className="font-mono text-sm uppercase tracking-widest mb-6 border-b border-black/10 pb-2">Tech Categories</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="border border-black/20 divide-y divide-black/20 mb-4">
              {categories.map((c: any) => (
                <div key={c.id} className="p-3 flex justify-between items-center hover:bg-black/[0.02]">
                  <span className="font-sans uppercase text-sm">{c.display_id} - {c.title}</span>
                  <div className="flex gap-3">
                    <button onClick={() => handleCatEdit(c)} className="font-mono text-[10px] uppercase text-black/60 hover:text-black">Edit</button>
                    <button onClick={() => handleCatDelete(c.id)} className="font-mono text-[10px] uppercase text-red-500 hover:text-red-700">Delete</button>
                  </div>
                </div>
              ))}
              {categories.length === 0 && <div className="p-3 font-mono text-[11px] text-black/50">No categories.</div>}
            </div>
          </div>
          
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-widest mb-4">{editingCategory ? "Edit Category" : "New Category"}</h3>
            <form onSubmit={handleCatSubmit} className="space-y-3">
              <input type="text" placeholder="Display ID (e.g. 01)" value={catFormData.display_id || ""} onChange={e => setCatFormData({...catFormData, display_id: e.target.value})} className="w-full border-b border-black/20 py-1 font-mono text-xs focus:outline-none focus:border-black" required />
              <input type="text" placeholder="Title (e.g. Frontend)" value={catFormData.title || ""} onChange={e => setCatFormData({...catFormData, title: e.target.value})} className="w-full border-b border-black/20 py-1 font-mono text-xs focus:outline-none focus:border-black" required />
              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={loading} className="px-4 py-2 bg-black text-white font-mono text-[10px] uppercase">{loading ? "..." : "Save"}</button>
                {editingCategory && <button type="button" onClick={() => { setEditingCategory(null); setCatFormData({display_id: "", title: ""}); }} className="px-4 py-2 border border-black/20 font-mono text-[10px] uppercase">Cancel</button>}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className="border border-black/20 p-6 bg-white shadow-[4px_4px_0_rgba(0,0,0,0.05)]">
        <h2 className="font-mono text-sm uppercase tracking-widest mb-6 border-b border-black/10 pb-2">Tech Items</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="border border-black/20 divide-y divide-black/20 mb-4">
              {items.map((i: any) => {
                const cat = categories.find(c => String(c.id) === String(i.category_id));
                return (
                <div key={i.id} className="p-3 flex justify-between items-center hover:bg-black/[0.02]">
                  <span className="font-sans uppercase text-sm">{i.name || i.title} <span className="font-mono text-[10px] text-black/40 ml-2">({cat?.title || i.category_id})</span></span>
                  <div className="flex gap-3">
                    <button onClick={() => handleItemEdit(i)} className="font-mono text-[10px] uppercase text-black/60 hover:text-black">Edit</button>
                    <button onClick={() => handleItemDelete(i.id)} className="font-mono text-[10px] uppercase text-red-500 hover:text-red-700">Delete</button>
                  </div>
                </div>
              )})}
              {items.length === 0 && <div className="p-3 font-mono text-[11px] text-black/50">No items.</div>}
            </div>
          </div>
          
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-widest mb-4">{editingItem ? "Edit Item" : "New Item"}</h3>
            <form onSubmit={handleItemSubmit} className="space-y-3">
              <select value={itemFormData.category_id || ""} onChange={e => setItemFormData({...itemFormData, category_id: e.target.value})} className="w-full border-b border-black/20 py-1 font-mono text-xs focus:outline-none focus:border-black bg-transparent" required>
                <option value="" disabled>Select Category</option>
                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
              <input type="text" placeholder="Name (e.g. React.js)" value={itemFormData.name || itemFormData.title || ""} onChange={e => setItemFormData({...itemFormData, name: e.target.value, title: e.target.value})} className="w-full border-b border-black/20 py-1 font-mono text-xs focus:outline-none focus:border-black" required />
              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={loading} className="px-4 py-2 bg-black text-white font-mono text-[10px] uppercase">{loading ? "..." : "Save"}</button>
                {editingItem && <button type="button" onClick={() => { setEditingItem(null); setItemFormData({category_id: "", name: ""}); }} className="px-4 py-2 border border-black/20 font-mono text-[10px] uppercase">Cancel</button>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
