// frontend/components/BlogCard.jsx
import Link from "next/link";

const PLACEHOLDER_GRADIENTS = {
  editorial: "linear-gradient(135deg, #c0392b 0%, #922b21 100%)",
  tech: "linear-gradient(135deg, #0f6fff 0%, #0040c0 100%)",
  story: "linear-gradient(135deg, #c9863a 0%, #7d5a2f 100%)",
};

const PLACEHOLDER_ICONS = {
  editorial: "✦",
  tech: "⌨",
  story: "◎",
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogCard({ blog }) {
  const {
    id, title, subtitle, author, date,
    tags = [], coverImage, template, readTime, excerpt,
  } = blog;

  return (
    <Link href={`/blog/${id}`} className="blog-card">
      {coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={coverImage}
          alt={title}
          className="blog-card-image"
        />
      ) : (
        <div
          className="blog-card-image-placeholder"
          style={{ background: PLACEHOLDER_GRADIENTS[template] || "#333" }}
        >
          {PLACEHOLDER_ICONS[template] || "◆"}
        </div>
      )}

      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span className={`template-badge ${template}`}>{template}</span>
          <span>{readTime}</span>
        </div>

        <h2 className="blog-card-title">{title}</h2>

        {(excerpt || subtitle) && (
          <p className="blog-card-excerpt">{excerpt || subtitle}</p>
        )}

        {tags.length > 0 && (
          <div className="tag-list">
            {tags.slice(0, 3).map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        )}
      </div>

      <div className="blog-card-footer">
        <span className="blog-card-author">{author}</span>
        <span>{formatDate(date)}</span>
      </div>
    </Link>
  );
}
