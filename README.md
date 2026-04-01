# 🎓 CampusAI — Smart Campus Assistant

A role-aware AI assistant that serves **students, lecturers, staff, and guests** on a university campus.

---

## 📁 Project Structure

```
smart-campus-assistant/
├── index.html              # Main HTML entry point
├── styles/
│   └── main.css            # Full stylesheet (dark-themed, responsive)
├── js/
│   ├── data.js             # Campus knowledge base, role configs, events, directory
│   ├── ai-engine.js        # NLP intent detection & response generation
│   ├── ui.js               # UI renderer (chat, dashboard, map, events, directory)
│   └── app.js              # Main app controller & initialization
└── README.md               # This file
```

---

## 🚀 Features

### 🔐 Role-Based Access
| Role     | Access Level | Key Features |
|----------|-------------|--------------|
| Student  | Academic    | Timetable, fees, library, grades, exams |
| Lecturer | Faculty     | Teaching schedule, room booking, grading |
| Staff    | Admin       | HR forms, IT tickets, procurement, payroll |
| Guest    | Public      | Admissions, events, directions, contacts |

### 💬 Intelligent Chat Assistant
- Natural language intent detection (no external API needed)
- Fuzzy keyword matching with spell correction
- Contextual responses based on active role
- Conversation history management
- Voice input via Web Speech API (where supported)
- Emergency contacts quick-access

### 📊 Dynamic Dashboard
- Role-specific KPI cards
- Today's schedule overview
- Deadlines, balances, and notifications

### 🗺️ Interactive Campus Map
- Visual building layout with click-to-query
- Integrates with AI chat for navigation help

### 📅 Events Calendar
- Upcoming campus events, exams, and activities
- Type-tagged (Academic, Career, Sports, Wellness, etc.)

### 📞 Staff Directory
- Searchable contact list for all departments
- Direct email links and extension numbers

---

## 🛠️ Setup & Running

### Option 1: Open directly (no server needed)
```bash
# Simply open in a browser:
open index.html
```

### Option 2: Local development server
```bash
# Python
python3 -m http.server 3000

# Node.js (npx)
npx serve .

# Then visit: http://localhost:3000
```

### Option 3: Deploy to a web server
Upload the entire folder to any web hosting (Apache, Nginx, Netlify, Vercel, etc.). No backend required — it's fully client-side.

---

## 🔌 Integrating a Real AI Backend (Claude API)

To replace the rule-based engine with a live LLM, update `js/ai-engine.js`:

```javascript
async generateResponse(query) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "YOUR_API_KEY",
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: `You are CampusAI, a smart university campus assistant for ${this.currentRole}s.
               Only answer campus-related questions. Be concise and helpful.
               Campus knowledge: ${JSON.stringify(CAMPUS_DATA)}`,
      messages: [
        ...this.conversationHistory,
        { role: "user", content: query }
      ]
    })
  });
  const data = await response.json();
  return data.content[0].text;
}
```

> ⚠️ Never expose API keys client-side in production. Route requests through a backend proxy.

---

## 🔧 Customization

### Adding a New Intent
In `js/data.js`, add to the `responses` object:
```javascript
parking: {
  keywords: ['parking', 'park my car', 'vehicle'],
  handler: (role) => `Visitor parking is at Gate 2. Staff use Lot B.`
}
```

### Adding Campus Buildings to Map
In `js/data.js`, add to `buildings` array:
```javascript
{ id: 'newblock', name: 'Block F\nNew Wing', icon: '🏗️', x: 80, y: 40, w: 110, h: 65 }
```
Positions are in percentage (x, y) and pixels (w, h).

### Adding Events
In `js/data.js`, add to the `events` array:
```javascript
{
  day: '25', month: 'APR',
  title: 'Tech Summit 2026',
  location: 'Auditorium',
  time: '9:00am – 5:00pm',
  desc: 'Annual technology innovation summit.',
  type: 'Academic', typeColor: 'info',
}
```

### Changing the University Name
Search and replace `university.ac.ke` and `CampusAI` throughout the files.

---

## 📱 Responsive Design
- **Desktop** (1024px+): Sidebar + full content
- **Tablet** (768px–1023px): Collapsible sidebar
- **Mobile** (<768px): Hidden sidebar with toggle, full-width chat

---

## ⌨️ Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl+K` | Focus chat input |
| `Ctrl+B` | Toggle sidebar |
| `Enter`  | Send message |

---

## 🔐 Production Checklist
- [ ] Replace hardcoded demo data with your real university data
- [ ] Connect to your Student Information System (SIS) via API
- [ ] Integrate with a real authentication system (SAML/OAuth)
- [ ] Replace rule-based AI with Claude API (see above)
- [ ] Add HTTPS (required for voice input)
- [ ] Configure CORS for any API endpoints
- [ ] Run accessibility audit (WCAG 2.1 AA)

---

## 🧰 Tech Stack
- **Frontend**: Vanilla HTML, CSS, JavaScript (no frameworks)
- **Fonts**: Sora (UI) + JetBrains Mono (code/labels) — Google Fonts
- **AI**: Rule-based NLP engine (upgradeable to Claude API)
- **No dependencies** — runs in any modern browser

---

## 📄 License
MIT License — free to use, modify, and distribute.
