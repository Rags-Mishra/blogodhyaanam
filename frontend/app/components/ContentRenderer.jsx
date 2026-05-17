/**
 * ContentRenderer
 * Renders an array of content blocks:
 *   { type: "paragraph", text }
 *   { type: "heading", level: 2|3, text }
 *   { type: "quote", text, attribution? }
 *   { type: "image", url, caption? }
 *   { type: "callout", text }
 *
 * The theme is handled via parent CSS scoping,
 * so class names are always the same here.
 */
export default function ContentRenderer({ content = [], theme }) {
  if (!content || content.length === 0) {
    return null;
  }

  return (
    <div className={`content-blocks content-blocks--${theme}`}>
      {content.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="block-paragraph">
                {block.text}
              </p>
            );

          case "heading":
            const Tag = `h${block.level || 2}`;
            return (
              <Tag
                key={i}
                className={`block-heading block-heading-${block.level || 2}`}
              >
                {block.text}
              </Tag>
            );

          case "quote":
            return (
              <blockquote key={i} className="block-quote">
                <p>{block.text}</p>
                {block.attribution && (
                  <footer className="attribution">— {block.attribution}</footer>
                )}
              </blockquote>
            );

          case "image":
            return (
              <figure key={i} className="block-image">
                <img src={block.url} alt={block.caption || ""} />
                {block.caption && (
                  <figcaption>{block.caption}</figcaption>
                )}
              </figure>
            );

          case "callout":
            return (
              <aside key={i} className="block-callout">
                {block.text}
              </aside>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
