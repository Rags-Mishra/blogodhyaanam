// app/blog/[id]/page.tsx
import Link from "next/link";
import { fetchBlog } from "../../lib/api";
import { notFound } from "next/navigation";
import BlogRenderer from "../../components/BlogRenderer";

export async function generateMetadata({ params }: any) {
  const { id } = await params;

  const blog = await fetchBlog(id).then(data=>data.data).catch(() => null);
  if (!blog) {
    return {
      title: "Blog not found",
    };
  }

  return {
    title: `${blog.title} — The Blogodhyaanam`,
    description: blog.excerpt || blog.subtitle || "",
  };
}

export default async function BlogPage({ params }: any) {
  const { id } = await params;

  const blog = await fetchBlog(id).then(data=>data.data).catch(() => null);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <header className="site-header">
        <Link href="/" className="site-logo">
         Blogodhyaanam
        </Link>

        <span
          className={`template-badge ${blog.template}`}
          style={{ fontSize: "0.75rem" }}
        >
          {blog.template}
        </span>
      </header>

      <Link href="/" className="back-link">
        ← Back to all stories
      </Link>

      <BlogRenderer blog={blog} />
    </>
  );
}