// backend/seed.js
// Run: node seed.js
require("dotenv").config();
const { db } = require("./firebase");

const sampleBlogs = [
  // ─── TEMPLATE 1: EDITORIAL ───────────────────────────────────────────────
  {
    title: "The Quiet Revolution in Urban Architecture",
    subtitle: "How cities are reinventing themselves from the inside out",
    author: "Meera Nair",
    date: "2024-05-10",
    tags: ["architecture", "cities", "design", "sustainability"],
    coverImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200",
    template: "editorial",
    readTime: "8 min read",
    excerpt:
      "A new wave of architects is rejecting the glass-tower paradigm in favour of structures that breathe, adapt, and belong.",
    content: [
      {
        type: "paragraph",
        text: "Walk through any major city and you will notice a shift — subtle at first, then impossible to ignore. The relentless march of mirrored skyscrapers is slowing, replaced by buildings that seem to exhale: green walls spilling over balconies, terracotta facades warm in the afternoon light, ground floors that dissolve into the street rather than barricade against it.",
      },
      {
        type: "heading",
        text: "The Problem with Glass",
      },
      {
        type: "paragraph",
        text: "For half a century, the glass curtain wall was the universal language of ambition. It signalled modernity, openness, the triumph of technology. But as climate science matured, architects began to reckon with the consequences: glass buildings are thermal nightmares, demanding enormous energy to heat in winter and cool in summer.",
      },
      {
        type: "quote",
        text: "We built cities for cars and corporations. Now we are trying to build them for people — and that requires us to unlearn almost everything.",
        author: "Rashida Ng, Principal at Groundwork Studio",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900",
        caption: "The Bosco Verticale in Milan — a benchmark for biophilic urban design.",
      },
      {
        type: "heading",
        text: "Materials as Memory",
      },
      {
        type: "paragraph",
        text: "The most exciting projects today reach backwards to go forward. In Ahmedabad, a new cultural centre clads itself in hand-pressed brick — the same amber material that has defined the city's skyline for centuries. In Medellín, social housing complexes use compressed earth blocks sourced from the hillside they sit on. The building and its site share a geology, a logic.",
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "Mass timber construction now rivals concrete in structural performance",
          "Rammed earth walls provide natural thermal mass without chemical binders",
          "Recycled brick programmes are becoming standard in European cities",
          "Living roofs reduce urban heat island effect by up to 3°C locally",
        ],
      },
      {
        type: "callout",
        text: "By 2030, the EU mandates that all new public buildings meet nearly zero-energy standards — a target already shaping architectural education worldwide.",
        variant: "info",
      },
      {
        type: "heading",
        text: "The Human Scale",
      },
      {
        type: "paragraph",
        text: "Ultimately the quiet revolution is about proportion. The starchitect era celebrated buildings that overwhelmed the body — monuments to capital, indifferent to the pedestrian. The emerging generation of architects is obsessed instead with the human scale: the width of a doorway, the height of a window sill, the distance between a street tree and a bench. Small measurements. Enormous consequences.",
      },
      {
        type: "divider",
      },
      {
        type: "paragraph",
        text: "The cities that will thrive in the next century are not those that built the tallest towers, but those that built the most liveable streets. That is a quiet revolution — but it is a real one.",
      },
    ],
  },

  // ─── TEMPLATE 2: TECH ────────────────────────────────────────────────────
  {
    title: "Building a Real-Time Collaborative Editor with CRDTs",
    subtitle: "From theory to production — a deep dive into conflict-free data structures",
    author: "Arjun Sharma",
    date: "2024-06-02",
    tags: ["engineering", "crdt", "distributed-systems", "javascript"],
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200",
    template: "tech",
    readTime: "12 min read",
    excerpt:
      "Operational transforms were the old way. CRDTs are how modern collaborative tools handle concurrent edits without a central authority.",
    content: [
      {
        type: "paragraph",
        text: "If you have ever wondered how Figma, Notion, or Linear let multiple users edit the same document simultaneously without conflicts, the answer involves a class of data structures called CRDTs — Conflict-free Replicated Data Types. This post walks through building a minimal collaborative text editor using a CRDT called RGA (Replicated Growable Array).",
      },
      {
        type: "heading",
        text: "Why Not Operational Transforms?",
      },
      {
        type: "paragraph",
        text: "Operational Transforms (OT) were the dominant approach for decades — Google Docs uses a variant of OT. The core idea: when two users make concurrent edits, you transform one operation relative to the other so both converge to the same state. Simple in theory, nightmarish in practice.",
      },
      {
        type: "callout",
        text: "OT requires a central server to order operations. CRDTs can work peer-to-peer — every client can apply operations in any order and still converge.",
        variant: "warning",
      },
      {
        type: "heading",
        text: "The RGA Data Structure",
      },
      {
        type: "paragraph",
        text: "RGA represents a sequence of characters as a linked list where each node carries a unique timestamp (Lamport clock) and the ID of its left neighbour at insertion time. This lets us resolve insertion conflicts deterministically.",
      },
      {
        type: "code",
        language: "javascript",
        text: `// Each character in the document is a Node
class RGANode {
  constructor(id, value, leftId) {
    this.id = id;        // { counter: number, site: string }
    this.value = value;  // character or null (tombstone for deletes)
    this.leftId = leftId; // id of left neighbour at insert time
    this.next = null;
    this.prev = null;
  }
}

class RGA {
  constructor(siteId) {
    this.siteId = siteId;
    this.counter = 0;
    // Sentinel head node
    this.head = new RGANode({ counter: -1, site: '' }, null, null);
  }

  _generateId() {
    return { counter: ++this.counter, site: this.siteId };
  }

  // Find the node that should appear immediately left of a new node
  _findLeft(leftId) {
    let node = this.head;
    while (node.next) {
      const n = node.next;
      if (n.id.counter === leftId.counter && n.id.site === leftId.site) {
        return n;
      }
      node = node.next;
    }
    return this.head;
  }

  insert(index, char) {
    const id = this._generateId();
    const leftNode = this._nodeAt(index);
    const leftId = leftNode.id;
    this._applyInsert({ id, value: char, leftId });
    return { type: 'insert', id, value: char, leftId };
  }

  _applyInsert({ id, value, leftId }) {
    let left = this._findLeft(leftId);
    // Skip over nodes with higher priority (concurrent inserts)
    while (
      left.next &&
      this._compareIds(left.next.id, id) > 0
    ) {
      left = left.next;
    }
    const node = new RGANode(id, value, leftId);
    node.next = left.next;
    node.prev = left;
    if (left.next) left.next.prev = node;
    left.next = node;
  }

  _compareIds(a, b) {
    if (a.counter !== b.counter) return b.counter - a.counter;
    return a.site < b.site ? 1 : -1;
  }

  toText() {
    const chars = [];
    let node = this.head.next;
    while (node) {
      if (node.value !== null) chars.push(node.value);
      node = node.next;
    }
    return chars.join('');
  }
}`,
      },
      {
        type: "heading",
        text: "Syncing Over WebSockets",
      },
      {
        type: "paragraph",
        text: "Each local operation produces an op object. Broadcast it to peers via WebSocket. On receipt, call applyInsert or applyDelete. Because RGA is commutative and idempotent, order does not matter — you will always converge.",
      },
      {
        type: "code",
        language: "javascript",
        text: `// server.js (Node + ws)
const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ port: 8080 });
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  ws.on('message', (raw) => {
    const op = JSON.parse(raw);
    // Broadcast to all OTHER clients
    for (const client of clients) {
      if (client !== ws && client.readyState === 1) {
        client.send(JSON.stringify(op));
      }
    }
  });
  ws.on('close', () => clients.delete(ws));
});`,
      },
      {
        type: "heading",
        text: "Performance Considerations",
      },
      {
        type: "list",
        style: "numbered",
        items: [
          "Tombstone accumulation: deleted nodes are never removed, so documents grow. Compact with a garbage collection pass when all sites have acknowledged the delete.",
          "Large documents: traversal to find insertion point is O(n). Use a skip list or B-tree backed RGA for documents > 50k characters.",
          "Network: batch ops into 50ms windows before sending to avoid WebSocket frame overhead on fast typists.",
          "State sync for late joiners: persist the full op log in Redis Streams or Firestore and replay on connect.",
        ],
      },
      {
        type: "callout",
        text: "Yjs and Automerge are production-ready CRDT libraries. Roll your own only for learning — then switch to a battle-tested lib.",
        variant: "tip",
      },
      {
        type: "divider",
      },
      {
        type: "paragraph",
        text: "CRDTs are not magic — they trade conflict resolution complexity for storage overhead and careful data-structure design. But for collaborative tools where offline-first and peer-to-peer matter, they are the right trade-off. The era of the authoritative server as the single source of truth is quietly ending.",
      },
    ],
  },

  // ─── TEMPLATE 3: STORY ───────────────────────────────────────────────────
  {
    title: "The Last Monsoon We Remembered",
    subtitle: "",
    author: "Priya Venkataraman",
    date: "2024-07-18",
    tags: ["personal", "memory", "india", "climate"],
    coverImage: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200",
    template: "story",
    readTime: "6 min read",
    excerpt:
      "My grandmother kept a clay pot outside every June. The first smell of rain hitting hot earth was, for her, proof that the world still worked.",
    content: [
      {
        type: "paragraph",
        text: "My grandmother kept a clay pot outside the back door every June. Not for catching water — the pipe was right there, the plastic bucket far more practical. The pot was for the smell.",
      },
      {
        type: "paragraph",
        text: "Petrichor, we learn in school, is the word for rain on dry earth. But my grandmother never used that word. She called it the first breath of the season, and she would step outside the moment the clouds broke, close her eyes, and stand there until my grandfather grumbled that she was getting wet. She always smiled at that. Getting wet was the point.",
      },
      {
        type: "heading",
        text: "What We Took for Granted",
      },
      {
        type: "paragraph",
        text: "We grew up assuming the monsoon was permanent. It arrived in June — first the clouds piling over the Western Ghats, then the wind shifting, then the smell, then the rain like a curtain being drawn across the sky. It lasted until September. It was as reliable as the calendar itself.",
      },
      {
        type: "quote",
        text: "The rains will come when they come. They always have. They always will.",
        author: "My grandmother, every year",
      },
      {
        type: "paragraph",
        text: "She said this with the confidence of someone who had lived through partition, famine, and the death of three children in infancy. She was not naive. She had survived enough uncertainty to trust the things that remained certain. The monsoon was one of them.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=900",
        caption: "The first rains over Coorg — a sight that has drawn poets for centuries.",
      },
      {
        type: "heading",
        text: "The Year It Changed",
      },
      {
        type: "paragraph",
        text: "I do not remember exactly which year the pattern broke. Climatologists could tell you precisely — the data is there, the anomaly visible in the charts. But memory does not work like data. Memory works like water: it finds the low points, pools there, becomes still.",
      },
      {
        type: "paragraph",
        text: "What I remember is sitting with my father on the roof in July, watching a sky that should have been dark with cloud but was instead pale and flat and indifferent. The reservoir at the edge of town had dropped below the intake pipe. The bore wells were running brackish. And my father — an engineer, a practical man, a man who trusted measurements over feelings — said quietly: something is different this time.",
      },
      {
        type: "callout",
        text: "India has seen a 15% decline in central monsoon rainfall over the last four decades, while extreme precipitation events — floods and droughts — have increased in frequency.",
        variant: "info",
      },
      {
        type: "heading",
        text: "The Clay Pot",
      },
      {
        type: "paragraph",
        text: "After my grandmother passed, we found the clay pot where she always kept it, near the back door. Nobody had moved it. We did not discuss keeping it — we simply did not throw it away. It is still there, I am told. My aunt waters her plants with the same bucket it sits beside.",
      },
      {
        type: "paragraph",
        text: "Some Junes, the rains still come in time. The smell still rises from the earth and for a moment everything my grandmother believed feels true. I step outside. I close my eyes. I stand there until I am wet.",
      },
      {
        type: "divider",
      },
      {
        type: "paragraph",
        text: "Getting wet is still the point. I am just no longer certain it will always be possible.",
      },
    ],
  },
];

async function seed() {
  const collection = db.collection("blogs");
  console.log("🌱 Seeding blogs to Firestore...\n");

  for (const blog of sampleBlogs) {
    const ref = await collection.add({
      ...blog,
      createdAt: new Date().toISOString(),
    });
    console.log(`✅ Created [${blog.template}] "${blog.title}" → ${ref.id}`);
  }

  console.log("\n✨ Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
