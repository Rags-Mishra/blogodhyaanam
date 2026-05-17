// frontend/components/templates/TemplateTech.jsx
"use client";
import { useState } from "react";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric", month: "short", day: "numeric",
  });
}

function CopyButton({ code }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={copy}
      style={{
        position: "absolute",
        top: "0.75rem",
        right: "0.75rem",
        background: copied ? "#27ae60" : "rgba(255,255,255,0.12)",
        border: "none",
        borderRadius: "4px",
        color: "white",
        fontSize: "0.72rem",
        padding: "0.3rem 0.65rem",
        cursor: "pointer",
        fontFamily: "var(--font-mono)",
        letterSpacing: "0.04em",
        transition: "background 0.2s",
      }}
    >
      {copied ? "✓ copied" : "copy"}
    </button>
  );
}

function ContentBlock({ block }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 style={{
          fontFamily: "var(--font-mono)",
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "var(--accent-tech)",
          marginTop: "2.5rem",
          marginBottom: "0.75rem",
          letterSpacing: "-0.01em",
        }}>
          <span style={{ color: "rgba(15,111,255,0.4)", marginRight: "0.5rem" }}>##</span>
          {block.text}
        </h2>
      );

    case "paragraph":
      return (
        <p style={{
          fontSize: "1rem",
          lineHeight: 1.8,
          color: "#d4cfc9",
          marginBottom: "1.25rem",
          fontFamily: "var(--font-body)",
        }}>
          {block.text}
        </p>
      );

    case "code":
      return (
        <div style={{ position: "relative", margin: "1.5rem 0" }}>
          {block.language && (
            <div style={{
              background: "#1a1614",
              borderRadius: "6px 6px 0 0",
              padding: "0.4rem 1rem",
              fontSize: "0.72rem",
              fontFamily: "var(--font-mono)",
              color: "var(--accent-tech)",
              borderBottom: "1px solid #333",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <span>{block.language}</span>
              <span style={{ color: "#555", fontSize: "0.65rem" }}>⌥ code</span>
            </div>
          )}
          <pre style={{
            background: "#0d0c0b",
            borderRadius: block.language ? "0 0 6px 6px" : "6px",
            padding: "1.25rem 1rem",
            overflowX: "auto",
            margin: 0,
            border: "1px solid #2a2724",
            borderTop: block.language ? "none" : "1px solid #2a2724",
          }}>
            <code style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
              lineHeight: 1.65,
              color: "#e8e3dd",
              whiteSpace: "pre",
              display: "block",
            }}>
              {block.text}
            </code>
          </pre>
          <CopyButton code={block.text} />
        </div>
      );

    case "quote":
      return (
        <blockquote style={{
          margin: "2rem 0",
          padding: "1.25rem 1.5rem",
          borderLeft: "3px solid var(--accent-tech)",
          background: "rgba(15,111,255,0.06)",
          borderRadius: "0 6px 6px 0",
        }}>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.95rem",
            color: "#d4cfc9",
            lineHeight: 1.6,
            marginBottom: block.author ? "0.5rem" : 0,
          }}>
            // {block.text}
          </p>
          {block.author && (
            <cite style={{
              fontSize: "0.75rem",
              color: "var(--accent-tech)",
              fontStyle: "normal",
              fontFamily: "var(--font-mono)",
            }}>
              — {block.author}
            </cite>
          )}
        </blockquote>
      );

    case "image":
      return (
        <figure style={{ margin: "2rem 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.caption || ""}
            style={{
              width: "100%",
              borderRadius: "6px",
              border: "1px solid #2a2724",
              display: "block",
            }}
          />
          {block.caption && (
            <figcaption style={{
              marginTop: "0.5rem",
              fontSize: "0.8rem",
              color: "#6b6560",
              fontFamily: "var(--font-mono)",
              textAlign: "center",
            }}>
              // {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "list":
      return (
        <ul style={{
          margin: "1rem 0 1.25rem",
          paddingLeft: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}>
          {(block.items || []).map((item, i) => (
            <li key={i} style={{
              display: "flex",
              gap: "0.75rem",
              fontSize: "0.95rem",
              color: "#d4cfc9",
              lineHeight: 1.7,
            }}>
              <span style={{ color: "var(--accent-tech)", fontFamily: "var(--font-mono)", flexShrink: 0 }}>
                {block.style === "numbered" ? `${String(i + 1).padStart(2, "0")}.` : "→"}
              </span>
              {item}
            </li>
          ))}
        </ul>
      );

    case "divider":
      return (
        <div style={{
          margin: "2.5rem 0",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}>
          <div style={{ flex: 1, height: "1px", background: "#2a2724" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#444" }}>
            /* * */
          </span>
          <div style={{ flex: 1, height: "1px", background: "#2a2724" }} />
        </div>
      );

    case "callout": {
      const colors = {
        info:    { bg: "rgba(15,111,255,0.08)", border: "var(--accent-tech)", label: "INFO" },
        warning: { bg: "rgba(243,156,18,0.08)",  border: "#f39c12", label: "WARN" },
        tip:     { bg: "rgba(39,174,96,0.08)",   border: "#27ae60", label: "TIP" },
      };
      const col = colors[block.variant] || colors.info;
      return (
        <div style={{
          background: col.bg,
          border: `1px solid ${col.border}`,
          borderRadius: "6px",
          padding: "1rem 1.25rem",
          margin: "1.5rem 0",
          display: "flex",
          gap: "0.75rem",
          alignItems: "flex-start",
        }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: col.border,
            fontWeight: 700,
            letterSpacing: "0.08em",
            paddingTop: "0.15rem",
            flexShrink: 0,
          }}>
            [{col.label}]
          </span>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.875rem",
            color: "#d4cfc9",
            lineHeight: 1.65,
            margin: 0,
          }}>
            {block.text}
          </p>
        </div>
      );
    }

    default:
      return null;
  }
}

export default function TemplateTech({ blog }) {
  const { title, subtitle, author, date, tags = [], coverImage, readTime, content = [] } = blog;

  return (
    <div style={{ background: "#111009", minHeight: "100vh", color: "var(--paper)" }}>
      <article style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 2rem 6rem" }}>

        {/* Terminal-style header strip */}
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.78rem",
          color: "#555",
          padding: "0.75rem 0",
          borderBottom: "1px solid #222",
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
        }}>
          <span>~/blog/{blog.id}</span>
          <span>{formatDate(date)} · {readTime}</span>
        </div>

        {/* Cover */}
        {coverImage && (
          <div style={{
            marginBottom: "2rem",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid #2a2724",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverImage} alt={title} style={{ width: "100%", objectFit: "cover", maxHeight: "400px" }} />
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            {tags.map((t) => (
              <span key={t} style={{
                background: "rgba(15,111,255,0.12)",
                color: "var(--accent-tech)",
                border: "1px solid rgba(15,111,255,0.25)",
                borderRadius: "4px",
                padding: "0.15rem 0.55rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
              }}>
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          color: "white",
          marginBottom: subtitle ? "0.75rem" : "1.5rem",
        }}>
          {title}
        </h1>

        {subtitle && (
          <p style={{
            fontFamily: "var(--font-body)",
            color: "#7a7570",
            fontSize: "1.05rem",
            lineHeight: 1.55,
            marginBottom: "1.5rem",
          }}>
            // {subtitle}
          </p>
        )}

        {/* Author */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          paddingBottom: "2rem",
          marginBottom: "0.5rem",
          borderBottom: "1px solid var(--accent-tech)",
        }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            color: "#7a7570",
          }}>
            <span style={{ color: "var(--accent-tech)" }}>author</span>
            {" => "}
            <span style={{ color: "#d4cfc9" }}>{author}</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ paddingTop: "1rem" }}>
          {content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}
        </div>
      </article>
    </div>
  );
}
