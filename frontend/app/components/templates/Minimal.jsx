import styles from "./Minimal.module.css";
import ContentRenderer from "../ContentRenderer";

export default function MinimalTemplate({ blog }) {
  const date = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article className={styles.minimal}>
      <div className={styles.inner}>
        {/* Kicker line */}
        <div className={styles.kicker}>
          {blog.tags?.slice(0, 1).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
          {date && (
            <>
              <span className={styles.divider} />
              <span>{date}</span>
            </>
          )}
          <span className={styles.divider} />
          <span>{blog.readTime}</span>
        </div>

        {/* Title */}
        <h1 className={styles.title}>{blog.title}</h1>

        {/* Subtitle */}
        {blog.subtitle && (
          <p className={styles.subtitle}>{blog.subtitle}</p>
        )}

        {/* Rule */}
        <div className={styles.rule} />

        {/* Byline */}
        <div className={styles.byline}>
          {blog.authorAvatar && (
            <img
              src={blog.authorAvatar}
              alt={blog.author}
              className={styles.avatar}
            />
          )}
          <span>By <strong>{blog.author}</strong></span>
        </div>

        {/* Cover */}
        {blog.coverImage && (
          <figure className={styles.coverFigure}>
            <img
              src={blog.coverImage}
              alt={blog.title}
              className={styles.coverImage}
            />
          </figure>
        )}

        {/* All other tags */}
        {blog.tags?.length > 1 && (
          <div className={styles.tagRow}>
            {blog.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}

        {/* Content */}
        <ContentRenderer content={blog.content} theme="minimal" />
      </div>
    </article>
  );
}
