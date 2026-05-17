// frontend/app/page.jsx
import Link from "next/link";
import{fetchBlogs} from './lib/api'
import BlogCard from './components/BlogCard'
export const metadata = {
  title: "Blogodhyaanam",
};

// Accept searchParams for filter by template
export default async function HomePage({ searchParams }:{searchParams:any}) {
  const {template} =await searchParams;

  let blogs = [];
  let error = null;

  try {
    const data = await fetchBlogs({ template: template || undefined });
    console.log("data",data)
    blogs = data.data;
  } catch (err:any) {
    error = err.message;
  }
console.log(blogs.length)
  return (
    <>
      <header className="site-header">
        <Link href="/" className="site-logo">
          Blogodhyaanam
        </Link>
       { blogs&&<span style={{ fontSize: "0.8rem", color: "var(--ink-faint)" }}>
          {blogs.length} {blogs.length === 1 ? "story" : "stories"}
        </span>}
      </header>

      {blogs&&<main>
        <section className="listing-hero">
          <h1>From imagination to reality</h1>
          <p>
           Some thoughts that I pin down here :)
          </p>
        </section>

        {/* Template filter */}
        <div className="filter-bar">
          <Link href="/">
            <button className={`filter-btn ${!template ? "active" : ""}`}>
              All
            </button>
          </Link>
          <Link href="?template=editorial">
            <button className={`filter-btn ${template === "editorial" ? "active" : ""}`}>
              Editorial
            </button>
          </Link>
          <Link href="?template=tech">
            <button className={`filter-btn ${template === "tech" ? "active" : ""}`}>
              Technical
            </button>
          </Link>
          <Link href="?template=story">
            <button className={`filter-btn ${template === "story" ? "active" : ""}`}>
              Stories
            </button>
          </Link>
        </div>

        {error && (
          <div className="state-container">
            <p>⚠️ Could not load blogs: {error}</p>
            <p style={{ fontSize: "0.85rem" }}>
              Make sure the backend is running at{" "}
              <code>{process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}</code>
            </p>
          </div>
        )}

        {!error && blogs.length === 0 && (
          <div className="state-container">
            <p>No blogs found.</p>
            <p style={{ fontSize: "0.85rem" }}>
              Run <code>node seed.js</code> in the backend to add sample data.
            </p>
          </div>
        )}

        {!error && blogs.length > 0 && (
          <div className="blog-grid">
            {blogs.map((blog:any) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </main>}
    </>
  );
}
