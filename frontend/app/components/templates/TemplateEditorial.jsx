// frontend/components/templates/TemplateEditorial.jsx
"use client";
import { useEffect, useState } from "react";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric",
  });
}

// Renders each content block
function ContentBlock({ block }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.6rem, 3vw, 2rem)",
          letterSpacing: "-0.02em",
          marginTop: "2.5rem",
          marginBottom: "1rem",
          color: "var(--ink)",
          lineHeight: 1.2,
        }}>
          {block.text}
        </h2>
      );

    case "paragraph":
      return (
        <p style={{
          fontFamily: "var(--font-lora)",
          fontSize: "1.125rem",
          lineHeight: 1.8,
          color: "var(--ink)",
          marginBottom: "1.4rem",
        }}>
          {block.text}
        </p>
      );

    case "quote":
      return (
        <blockquote style={{
          margin: "2.5rem 0",
          padding: "1.5rem 2rem",
          borderLeft: "4px solid var(--accent-editorial)",
          background: "#fde8e7",
          borderRadius: "0 8px 8px 0",
        }}>
          <p style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "1.3rem",
            lineHeight: 1.5,
            color: "var(--ink)",
            marginBottom: block.author ? "0.75rem" : "0",
          }}>
            "{block.text}"
          </p>
          {block.author && (
            <cite style={{
              fontSize: "0.85rem",
              color: "var(--accent-editorial)",
              fontStyle: "normal",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}>
              — {block.author}
            </cite>
          )}
        </blockquote>
      );

    case "image":
      return (
        <figure style={{ margin: "2.5rem 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.caption || ""}
            style={{
              width: "100%",
              borderRadius: "8px",
              display: "block",
              maxHeight: "500px",
              objectFit: "cover",
            }}
          />
          {block.caption && (
            <figcaption style={{
              marginTop: "0.75rem",
              fontSize: "0.85rem",
              color: "var(--ink-faint)",
              textAlign: "center",
              fontStyle: "italic",
            }}>
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "list":
      const ListTag = block.style === "numbered" ? "ol" : "ul";
      return (
        <ListTag style={{
          margin: "1rem 0 1.4rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}>
          {(block.items || []).map((item, i) => (
            <li key={i} style={{
              fontFamily: "var(--font-lora)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "var(--ink)",
            }}>
              {item}
            </li>
          ))}
        </ListTag>
      );

    case "divider":
      return (
        <div style={{
          textAlign: "center",
          margin: "3rem 0",
          color: "var(--accent-editorial)",
          fontSize: "1.2rem",
          letterSpacing: "1rem",
        }}>
          ✦ ✦ ✦
        </div>
      );

    case "callout":
      const calloutColors = {
        info: { bg: "#e8f4f8", border: "#2980b9", text: "#1a5f7a" },
        warning: { bg: "#fef9e7", border: "#f39c12", text: "#7d6608" },
        tip: { bg: "#e9f7ef", border: "#27ae60", text: "#1e8449" },
      };
      const c = calloutColors[block.variant] || calloutColors.info;
      return (
        <div style={{
          background: c.bg,
          borderLeft: `4px solid ${c.border}`,
          borderRadius: "0 8px 8px 0",
          padding: "1rem 1.25rem",
          margin: "1.5rem 0",
          color: c.text,
          fontSize: "0.95rem",
          lineHeight: 1.6,
        }}>
          {block.text}
        </div>
      );

    default:
      return null;
  }
}

export default function TemplateEditorial({ blog }) {
  const { title, subtitle, author, date, tags = [], coverImage, readTime, content = [] } = blog;
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const progress = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setScrollProgress(Math.min(progress * 100, 100));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Reading progress bar */}
      <div style={{
        position: "fixed",
        top: 64,
        left: 0,
        height: "3px",
        width: `${scrollProgress}%`,
        background: "var(--accent-editorial)",
        zIndex: 99,
        transition: "width 0.1s linear",
      }} />

      <article style={{ maxWidth: "780px", margin: "0 auto", padding: "2rem 2rem 6rem" }}>

        {/* Cover image */}
        {coverImage && (
          <div style={{
            margin: "1.5rem 0 2.5rem",
            borderRadius: "12px",
            overflow: "hidden",
            maxHeight: "480px",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverImage} alt={title} style={{ width: "100%", objectFit: "cover" }} />
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "1rem",
          }}>
            {tags.map((t) => (
              <span key={t} style={{
                background: "#fde8e7",
                color: "var(--accent-editorial)",
                borderRadius: "4px",
                padding: "0.2rem 0.6rem",
                fontSize: "0.72rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}>
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          marginBottom: "1rem",
          color: "var(--ink)",
        }}>
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p style={{
            fontFamily: "var(--font-lora)",
            fontStyle: "italic",
            fontSize: "1.2rem",
            color: "var(--ink-muted)",
            lineHeight: 1.5,
            marginBottom: "1.5rem",
          }}>
            {subtitle}
          </p>
        )}

        {/* Byline */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          paddingBottom: "1.5rem",
          marginBottom: "2.5rem",
          borderBottom: "2px solid var(--accent-editorial)",
          fontSize: "0.85rem",
          color: "var(--ink-muted)",
        }}>
          <div style={{
            width: 36, height: 36,
            background: "var(--accent-editorial)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 700,
            fontSize: "1rem",
          }}>
            {author?.[0]?.toUpperCase() || "A"}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: "var(--ink)" }}>{author}</div>
            <div>{formatDate(date)} · {readTime}</div>
          </div>
        </div>

        {/* Content blocks */}
        <div>
          {content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}
        </div>
      </article>
    </>
  );
}
