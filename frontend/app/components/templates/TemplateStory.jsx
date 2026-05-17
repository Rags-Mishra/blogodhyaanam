// frontend/components/templates/TemplateStory.jsx
"use client";
import { useEffect, useState } from "react";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric",
  });
}

function ContentBlock({ block, isFirst }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 style={{
          fontFamily: "var(--font-lora)",
          fontStyle: "italic",
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "var(--accent-story)",
          marginTop: "3rem",
          marginBottom: "1rem",
          lineHeight: 1.3,
        }}>
          {block.text}
        </h2>
      );

    case "paragraph":
      // First paragraph gets a drop cap
      if (isFirst) {
        return (
          <p style={{
            fontFamily: "var(--font-lora)",
            fontSize: "1.15rem",
            lineHeight: 1.85,
            color: "#3a2e27",
            marginBottom: "1.5rem",
          }}>
            <span style={{
              float: "left",
              fontFamily: "var(--font-serif)",
              fontSize: "4.2rem",
              lineHeight: 0.75,
              marginRight: "0.12em",
              marginTop: "0.1em",
              color: "var(--accent-story)",
            }}>
              {block.text[0]}
            </span>
            {block.text.slice(1)}
          </p>
        );
      }
      return (
        <p style={{
          fontFamily: "var(--font-lora)",
          fontSize: "1.15rem",
          lineHeight: 1.85,
          color: "#3a2e27",
          marginBottom: "1.5rem",
        }}>
          {block.text}
        </p>
      );

    case "quote":
      return (
        <blockquote style={{
          margin: "3rem -1.5rem",
          padding: "2rem 3rem",
          background: "#fef3e2",
          borderRadius: "2px",
          position: "relative",
        }}>
          <div style={{
            position: "absolute",
            top: "0.5rem",
            left: "1.5rem",
            fontFamily: "var(--font-serif)",
            fontSize: "4rem",
            color: "var(--accent-story)",
            opacity: 0.3,
            lineHeight: 1,
          }}>
            "
          </div>
          <p style={{
            fontFamily: "var(--font-lora)",
            fontStyle: "italic",
            fontSize: "1.3rem",
            lineHeight: 1.55,
            color: "#3a2e27",
            textAlign: "center",
            marginBottom: block.author ? "1rem" : 0,
            position: "relative",
            zIndex: 1,
          }}>
            {block.text}
          </p>
          {block.author && (
            <cite style={{
              display: "block",
              textAlign: "center",
              fontSize: "0.85rem",
              color: "var(--accent-story)",
              fontStyle: "normal",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}>
              — {block.author}
            </cite>
          )}
        </blockquote>
      );

    case "image":
      return (
        <figure style={{ margin: "2.5rem -1.5rem" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.caption || ""}
            style={{
              width: "100%",
              display: "block",
              maxHeight: "480px",
              objectFit: "cover",
            }}
          />
          {block.caption && (
            <figcaption style={{
              marginTop: "0.75rem",
              fontSize: "0.85rem",
              color: "#9a8070",
              textAlign: "center",
              fontFamily: "var(--font-lora)",
              fontStyle: "italic",
              padding: "0 1.5rem",
            }}>
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "list":
      return (
        <ul style={{
          margin: "1rem 0 1.5rem 1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}>
          {(block.items || []).map((item, i) => (
            <li key={i} style={{
              fontFamily: "var(--font-lora)",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              color: "#3a2e27",
              paddingLeft: "0.5rem",
            }}>
              {item}
            </li>
          ))}
        </ul>
      );

    case "divider":
      return (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "3rem 0",
          gap: "1rem",
        }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              width: 6, height: 6,
              borderRadius: "50%",
              background: "var(--accent-story)",
              opacity: 0.4,
            }} />
          ))}
        </div>
      );

    case "callout": {
      return (
        <aside style={{
          margin: "2rem 0",
          padding: "1.25rem 1.5rem",
          background: "#fef3e2",
          borderRadius: "2px",
          borderLeft: "3px solid var(--accent-story)",
          fontFamily: "var(--font-lora)",
          fontStyle: "italic",
          fontSize: "1rem",
          color: "#5c3a1e",
          lineHeight: 1.65,
        }}>
          {block.text}
        </aside>
      );
    }

    default:
      return null;
  }
}

export default function TemplateStory({ blog }) {
  const { title, subtitle, author, date, tags = [], coverImage, readTime, content = [] } = blog;
  const [timeOfDay, setTimeOfDay] = useState("day");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 6 || hour >= 20) setTimeOfDay("night");
    else if (hour >= 17) setTimeOfDay("evening");
    else setTimeOfDay("day");
  }, []);

  const bgColor = timeOfDay === "night" ? "#1c1510" : timeOfDay === "evening" ? "#fdf5ec" : "#faf7f2";
  const textColor = timeOfDay === "night" ? "#e8ddd5" : "#3a2e27";

  let firstParagraphIdx = -1;

  return (
    <div style={{ background: bgColor, minHeight: "100vh", transition: "background 1s" }}>

      {/* Full-bleed hero */}
      {coverImage && (
        <div style={{
          height: "55vh",
          minHeight: "300px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImage}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
          }} />
        </div>
      )}

      <article style={{
        maxWidth: "680px",
        margin: "0 auto",
        padding: coverImage ? "3rem 2rem 6rem" : "4rem 2rem 6rem",
        color: textColor,
      }}>

        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
            {tags.map((t) => (
              <span key={t} style={{
                fontSize: "0.75rem",
                color: "var(--accent-story)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "var(--font-body)",
              }}>
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 style={{
          fontFamily: "var(--font-lora)",
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          fontWeight: 600,
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          marginBottom: subtitle ? "1rem" : "1.5rem",
          color: timeOfDay === "night" ? "white" : "#1c1510",
        }}>
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p style={{
            fontFamily: "var(--font-lora)",
            fontStyle: "italic",
            fontSize: "1.15rem",
            color: "#9a8070",
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
          justifyContent: "space-between",
          paddingBottom: "2rem",
          marginBottom: "2.5rem",
          borderBottom: "1px solid #d4b896",
          fontSize: "0.85rem",
          color: "#9a8070",
          fontFamily: "var(--font-body)",
        }}>
          <span style={{ fontWeight: 500, color: "var(--accent-story)" }}>{author}</span>
          <span>{formatDate(date)} · {readTime}</span>
        </div>

        {/* Content */}
        <div style={{ position: "relative" }}>
          {content.map((block, i) => {
            let isFirstPara = false;
            if (block.type === "paragraph" && firstParagraphIdx === -1) {
              firstParagraphIdx = i;
              isFirstPara = true;
            }
            return <ContentBlock key={i} block={block} isFirst={isFirstPara} />;
          })}
        </div>

        {/* End flourish */}
        <div style={{
          marginTop: "4rem",
          textAlign: "center",
          color: "var(--accent-story)",
          fontSize: "1.5rem",
          opacity: 0.5,
        }}>
          ◎
        </div>
      </article>
    </div>
  );
}
