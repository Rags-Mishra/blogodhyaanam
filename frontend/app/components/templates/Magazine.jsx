import styles from "./Magazine.module.css";
import ContentRenderer from "../ContentRenderer";

export default function MagazineTemplate({ blog }) {
  const date = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article className={styles.magazine}>
      {/* Top strip */}
      <div className={styles.topStrip}>
        <div className={styles.topStripInner}>
          {blog.tags?.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
          <span className={styles.stripDate}>{date}</span>
        </div>
      </div>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>{blog.title}</h1>
            {blog.subtitle && (
              <p className={styles.subtitle}>{blog.subtitle}</p>
            )}
            <div className={styles.byline}>
              {blog.authorAvatar && (
                <img
                  src={blog.authorAvatar}
                  alt={blog.author}
                  className={styles.avatar}
                />
              )}
              <div>
                <div className={styles.bylineTop}>By <strong>{blog.author}</strong></div>
                <div className={styles.bylineBottom}>{blog.readTime}</div>
              </div>
            </div>
          </div>
          <div className={styles.headerRight}>
            {blog.coverImage && (
              <div className={styles.coverWrap}>
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className={styles.coverImage}
                />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.bodyInner}>
          <ContentRenderer content={blog.content} theme="magazine" />
        </div>
      </div>
    </article>
  );
}
