// frontend/lib/api.js
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function fetchBlogs({ tag, template, limit } = {}) {
  const params = new URLSearchParams();
  if (tag) params.set("tag", tag);
  if (template) params.set("template", template);
  if (limit) params.set("limit", String(limit));

  const url = `${API_BASE}/blogs${params.toString() ? `?${params}` : ""}`;
  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
  return res.json(); // { blogs: [], total: n }
}

export async function fetchBlog(id) {
  const res = await fetch(`${API_BASE}/blogs/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Failed to fetch blog ${id}: ${res.status}`);
  }
  return res.json();
}
