const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const {db} = require('./firebase')
const app = express();
app.use(cors());
app.use(express.json());



// GET all blogs (summary for listing)
app.get("/api/blogs", async (req, res) => {
  try {
    const snapshot = await db
      .collection("blogs")
      .orderBy("createdAt", "desc")
      .get();

    const blogs_data = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        subtitle: data.subtitle || "",
        author: data.author,
        authorAvatar: data.authorAvatar || "",
        coverImage: data.coverImage || "",
        tags: data.tags || [],
        template: data.template, // "editorial" | "magazine" | "minimal"
        readTime: data.readTime || "5 min read",
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        excerpt: data.excerpt || "",
      };
    });

    res.json({ success: true, data: blogs_data });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single blog by ID (full content)
app.get("/api/blogs/:id", async (req, res) => {
  try {
    const doc = await db
      .collection("blogs")
      .doc(req.params.id)
      .get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, error: "Blog not found" });
    }

    const data = doc.data();
    res.json({
      success: true,
      data: {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
      },
    });
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create a new blog
app.post("/api/blogs", async (req, res) => {
  try {
    const {
      title,
      subtitle,
      author,
      authorAvatar,
      coverImage,
      tags,
      template,
      readTime,
      excerpt,
      content, // Array of content blocks (see schema below)
    } = req.body;

    if (!title || !author || !template || !content) {
      return res.status(400).json({
        success: false,
        error: "title, author, template, and content are required",
      });
    }

    const validTemplates = ["editorial", "magazine", "minimal"];
    if (!validTemplates.includes(template)) {
      return res.status(400).json({
        success: false,
        error: `template must be one of: ${validTemplates.join(", ")}`,
      });
    }

    const docRef = await db.collection("blogs").add({
      title,
      subtitle: subtitle || "",
      author,
      authorAvatar: authorAvatar || "",
      coverImage: coverImage || "",
      tags: tags || [],
      template,
      readTime: readTime || "5 min read",
      excerpt: excerpt || "",
      content,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ success: true, id: docRef.id });
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
