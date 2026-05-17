import styles from "./Editorial.module.css";
import ContentRenderer from "../ContentRenderer";

export default function EditorialTemplate({ blog }) {
  return (
    <article className={styles.editorial}>
      {/* Hero */}
      <div className={styles.hero}>
        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className={styles.heroImage}
          />
        )}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.tags}>
            {blog.tags?.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
          <h1 className={styles.title}>{blog.title}</h1>
          {blog.subtitle && (
            <p className={styles.subtitle}>{blog.subtitle}</p>
          )}
          <div className={styles.meta}>
            {blog.authorAvatar && (
              <img
                src={blog.authorAvatar}
                alt={blog.author}
                className={styles.avatar}
              />
            )}
            <div>
              <span className={styles.authorName}>{blog.author}</span>
              <span className={styles.dot}>·</span>
              <span className={styles.readTime}>{blog.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.bodyInner}>
          <ContentRenderer content={blog.content} theme="editorial" />
        </div>
      </div>
    </article>
  );
}
