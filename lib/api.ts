import { createClient } from "./supabase/client";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type ProjectSlugRecord = {
  slug?: string;
};

export type ApiMutationPayload = Record<string, unknown>;

/**
 * Helper for client-side API requests with auth token
 */
export async function apiFetchClient(endpoint: string, options: RequestInit = {}) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  const headers = new Headers(options.headers);
  if (session?.access_token) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }

  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
}

export async function fetchProjects() {
  const res = await fetch(`${API_BASE_URL}/projects`, { next: { tags: ["projects"] } });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function fetchProjectBySlug(slug: string) {
  const projects = await fetchProjects();
  return (projects as ProjectSlugRecord[]).find((p) => p.slug === slug) ?? null;
}

export async function fetchCertificates() {
  const res = await fetch(`${API_BASE_URL}/certificates`, { next: { tags: ["certificates"] } });
  if (!res.ok) throw new Error("Failed to fetch certificates");
  return res.json();
}

export async function fetchTechCategories() {
  const res = await fetch(`${API_BASE_URL}/tech/categories`, { next: { tags: ["tech-categories"] } });
  if (!res.ok) throw new Error("Failed to fetch tech categories");
  return res.json();
}

export async function fetchTechItems() {
  const res = await fetch(`${API_BASE_URL}/tech/items`, { next: { tags: ["tech-items"] } });
  if (!res.ok) throw new Error("Failed to fetch tech items");
  return res.json();
}

export async function fetchNavLinks() {
  const res = await fetch(`${API_BASE_URL}/nav-links`, { next: { tags: ["nav-links"] } });
  if (!res.ok) throw new Error("Failed to fetch nav links");
  return res.json();
}

export async function fetchSocialLinks() {
  const res = await fetch(`${API_BASE_URL}/social-links`, { next: { tags: ["social-links"] } });
  if (!res.ok) throw new Error("Failed to fetch social links");
  return res.json();
}

export async function fetchExpertise() {
  const res = await fetch(`${API_BASE_URL}/expertise`, { next: { tags: ["expertise"] } });
  if (!res.ok) throw new Error("Failed to fetch expertise");
  return res.json();
}

export async function fetchSiteContent() {
  const res = await fetch(`${API_BASE_URL}/site-content`, { next: { tags: ["site-content"] } });
  if (!res.ok) throw new Error("Failed to fetch site content");
  return res.json();
}

// Admin Write Operations

export async function uploadImage(file: File, folder: string) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await apiFetchClient(`/uploads/${folder}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload image");
  return res.json(); // Expected to return { publicUrl: "..." }
}

export async function createProject(data: ApiMutationPayload) {
  const res = await apiFetchClient("/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
}

export async function updateProject(id: string, data: ApiMutationPayload) {
  const res = await apiFetchClient(`/projects/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update project");
  return res.json();
}

export async function deleteProject(id: string) {
  const res = await apiFetchClient(`/projects/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete project");
}

// Project Images
export async function getProjectImages(projectId: string) {
  const res = await fetch(`${API_BASE_URL}/projects/${projectId}/images`);
  if (!res.ok) throw new Error("Failed to fetch project images");
  return res.json();
}

export async function addProjectImage(projectId: string, data: ApiMutationPayload) {
  const res = await apiFetchClient(`/projects/${projectId}/images`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add project image");
  return res.json();
}

export async function updateProjectImage(id: string, data: ApiMutationPayload) {
  const res = await apiFetchClient(`/project-images/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update project image");
  return res.json();
}

export async function deleteProjectImage(id: string) {
  const res = await apiFetchClient(`/project-images/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete project image");
}

// Certificates
export async function createCertificate(data: ApiMutationPayload) {
  const res = await apiFetchClient("/certificates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create certificate");
  return res.json();
}

export async function updateCertificate(id: string, data: ApiMutationPayload) {
  const res = await apiFetchClient(`/certificates/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update certificate");
  return res.json();
}

export async function deleteCertificate(id: string) {
  const res = await apiFetchClient(`/certificates/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete certificate");
}

// Tech Categories
export async function createTechCategory(data: ApiMutationPayload) {
  const res = await apiFetchClient("/tech/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create tech category");
  return res.json();
}

export async function updateTechCategory(id: string, data: ApiMutationPayload) {
  const res = await apiFetchClient(`/tech/categories/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update tech category");
  return res.json();
}

export async function deleteTechCategory(id: string) {
  const res = await apiFetchClient(`/tech/categories/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete tech category");
}

// Tech Items
export async function createTechItem(data: ApiMutationPayload) {
  const res = await apiFetchClient("/tech/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create tech item");
  return res.json();
}

export async function updateTechItem(id: string, data: ApiMutationPayload) {
  const res = await apiFetchClient(`/tech/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update tech item");
  return res.json();
}

export async function deleteTechItem(id: string) {
  const res = await apiFetchClient(`/tech/items/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete tech item");
}

// Site Content
export async function updateSiteContent(key: string, data: ApiMutationPayload) {
  const res = await apiFetchClient(`/site-content/${key}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update site content");
  return res.json();
}

export async function deleteSiteContent(key: string) {
  const res = await apiFetchClient(`/site-content/${key}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete site content");
}

// Nav Links
export async function createNavLink(data: ApiMutationPayload) {
  const res = await apiFetchClient("/nav-links", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create nav link");
  return res.json();
}

export async function updateNavLink(id: string, data: ApiMutationPayload) {
  const res = await apiFetchClient(`/nav-links/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update nav link");
  return res.json();
}

export async function deleteNavLink(id: string) {
  const res = await apiFetchClient(`/nav-links/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete nav link");
}

// Social Links
export async function createSocialLink(data: ApiMutationPayload) {
  const res = await apiFetchClient("/social-links", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create social link");
  return res.json();
}

export async function updateSocialLink(id: string, data: ApiMutationPayload) {
  const res = await apiFetchClient(`/social-links/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update social link");
  return res.json();
}

export async function deleteSocialLink(id: string) {
  const res = await apiFetchClient(`/social-links/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete social link");
}

// Expertise
export async function createExpertise(data: ApiMutationPayload) {
  const res = await apiFetchClient("/expertise", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create expertise");
  return res.json();
}

export async function updateExpertise(id: string, data: ApiMutationPayload) {
  const res = await apiFetchClient(`/expertise/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update expertise");
  return res.json();
}

export async function deleteExpertise(id: string) {
  const res = await apiFetchClient(`/expertise/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete expertise");
}

export async function deleteUpload(path: string) {
  const res = await apiFetchClient(`/uploads?path=${encodeURIComponent(path)}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete upload");
}

