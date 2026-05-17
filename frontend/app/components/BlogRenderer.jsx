// frontend/components/BlogRenderer.jsx
import TemplateEditorial from "./templates/TemplateEditorial";
import TemplateTech from "./templates/TemplateTech";
import TemplateStory from "./templates/TemplateStory";

export default function BlogRenderer({ blog }) {
  console.log("blog",blog)
  switch (blog.template) {
    case "editorial":
      return <TemplateEditorial blog={blog} />;
    case "tech":
      return <TemplateTech blog={blog} />;
    case "story":
      return <TemplateStory blog={blog} />;
    default:
      return (
        <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
          Unknown template: <strong>{blog.template}</strong>
        </div>
      );
  }
}
