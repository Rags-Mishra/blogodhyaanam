    # Blog System - Next.js + Express.js + Firebase

## Project Structure

```
blog-system/
├── frontend/          # Next.js app
│   ├── app/
│   │   ├── page.jsx              # Blog listing page
│   │   ├── blog/[id]/page.jsx    # Individual blog page
│   │   ├── layout.jsx
│   │   └── globals.css
│   ├── components/
│   │   ├── BlogCard.jsx          # Card for listing
│   │   ├── templates/
│   │   │   ├── TemplateEditorial.jsx   # Template 1: Magazine/Editorial
│   │   │   ├── TemplateTech.jsx        # Template 2: Technical/Dev
│   │   │   └── TemplateStory.jsx       # Template 3: Narrative/Story
│   │   └── BlogRenderer.jsx      # Routes to correct template
│   └── package.json
│
└── backend/           # Express.js API
    ├── server.js
    ├── routes/blogs.js
    ├── firebase.js    # Firebase Admin SDK init
    ├── seed.js        # Seed sample blogs to Firestore
    └── package.json
```

## Setup Instructions

### 1. Firebase Setup
1. Go to https://console.firebase.google.com
2. Create a new project
3. Enable Firestore Database
4. Go to Project Settings > Service Accounts > Generate new private key
5. Save the JSON as `backend/serviceAccountKey.json`

### 2. Backend Setup
```bash
cd backend
npm install
node seed.js        # Seed sample blog data
node server.js      # Start on port 4000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev         # Start on port 3000
```

## Blog Data Schema (Firestore)

```json
{
  "id": "auto-generated",
  "title": "Blog Title",
  "subtitle": "Optional subtitle",
  "author": "Author Name",
  "date": "2024-01-15",
  "tags": ["tag1", "tag2"],
  "coverImage": "https://...",
  "template": "editorial" | "tech" | "story",
  "readTime": "5 min read",
  "content": [
    { "type": "heading", "text": "Section Title" },
    { "type": "paragraph", "text": "Body text..." },
    { "type": "quote", "text": "A blockquote", "author": "Source" },
    { "type": "code", "language": "javascript", "text": "const x = 1;" },
    { "type": "image", "src": "https://...", "caption": "Caption" },
    { "type": "list", "style": "bullet", "items": ["item1", "item2"] },
    { "type": "divider" },
    { "type": "callout", "text": "Highlighted note", "variant": "info" }
  ]
}
```

## 3 Templates

- **Editorial** – Magazine-style with big typography, pull quotes, serif fonts
- **Tech** – Developer-focused with code blocks, monospace, dark accents  
- **Story** – Narrative/essay style with warm tones, flowing prose layout
