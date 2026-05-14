# FUTURE_FS_02
# 📊 LeadFlow CRM — Client Lead Management System

> **Future Interns · Full Stack Web Development · Task 2 (2026)**  
> A professional, AI-powered Client Lead Management System built as a single-file web application with a full Node.js + Express + MongoDB backend.

---

## 🔗 Live Demo

> https://future-fs-02-crm-ten.vercel.app/

---

## ✨ Features

### 🎯 Core CRM
| Feature | Description |
|--------|-------------|
| **Lead Management** | Add, view, edit, and delete leads with name, email, company, phone, source, and status |
| **5-Stage Pipeline** | Track every lead: `New → Contacted → Qualified → Converted → Lost` |
| **Follow-up Notes** | Add timestamped notes to any lead; remove individual entries |
| **Quick Status Switch** | Change pipeline stage with one click from the notes panel |
| **Delete Confirmation** | Confirmation modal prevents accidental data loss |

### 🔍 Search, Filter & Sort
- **Live search** across name, email, company, and phone
- **Filter by status** — view only New, Contacted, Qualified, Converted, or Lost leads
- **Filter by source** — Contact Form, LinkedIn, Referral, Cold Email, Instagram, WhatsApp, Walk-in
- **Sort** by newest first, oldest first, name A–Z, or pipeline stage
- **Pagination** — 8 leads per page with prev/next controls

### 📊 Dashboard & Analytics
- **Metrics bar** — Total leads, New leads, In Pipeline, Conversion Rate (all live)
- **Hot Leads panel** — All new leads at a glance on the dashboard
- **Recent Conversions** — Latest won deals displayed instantly
- **Source Breakdown chart** — Horizontal bar chart by lead channel
- **Analytics view** — Status chart, source chart, and conversion funnel
- **Pipeline Board (Kanban)** — Visual columns for all 5 pipeline stages

### 🤖 Nova AI Assistant (Claude-Powered)
- **Real AI integration** using Anthropic Claude API (`claude-sonnet-4-20250514`)
- **Live CRM context** — Nova reads your current lead counts, statuses, sources, and recent activity before every response
- **5 built-in quick prompts:**
  - 📊 Pipeline summary
  - 🎯 Who to follow up today
  - ✉️ Draft a follow-up email
  - 📈 How to improve conversion rate
  - 🏆 Best performing source
- **Full conversation memory** within the session
- **Typing indicator** with animated dots while Nova is thinking
- **Privacy-safe** — your API key stays in the browser only, never stored anywhere

### 📁 Data Tools
- **CSV Import** — Paste comma-separated rows to bulk-add leads instantly
- **CSV Export** — Download all leads as a `.csv` file
- **Keyboard shortcut** — `Esc` closes any open modal

---

## 🛠 Tech Stack

### Frontend (Single-File App)
| Technology | Purpose |
|-----------|---------|
| **HTML5** | Structure and layout |
| **CSS3** | Custom dark theme, animations, responsive grid |
| **Vanilla JavaScript (ES6+)** | State management, rendering, all interactions |
| **Google Fonts** — Syne + DM Sans | Premium typography |
| **Anthropic Claude API** | AI assistant (Nova) |

### Backend (Full REST API)
| Technology | Purpose |
|-----------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | HTTP server and routing |
| **MongoDB** | NoSQL database for leads and users |
| **Mongoose** | ODM — schemas, validation, queries |
| **JWT (jsonwebtoken)** | Stateless authentication tokens |
| **bcryptjs** | Password hashing (12 salt rounds) |
| **dotenv** | Environment variable management |
| **cors** | Cross-origin request handling |
| **nodemon** | Auto-restart during development |

---

## 📁 Project Structure

```
minicrm/
│
├── LeadFlow_CRM.html          # ✅ Complete frontend — open directly in browser
│
├── server.js                  # Express + MongoDB REST API
├── package.json               # Backend dependencies and scripts
├── .env.example               # Environment variable template
└── README.md                  # This file
```

---

## 🚀 Getting Started

### Option A — Frontend Only (Instant, No Setup)

1. Download `LeadFlow_CRM.html`
2. Open it in **Chrome** or **Edge** — no install, no server needed
3. *(Optional)* Add your Anthropic API key in the sidebar to activate Nova AI

> ✅ This is the fastest way to demo the project

---

### Option B — Full Stack (Frontend + Backend + Database)

#### Prerequisites
- Node.js v18 or higher → [nodejs.org](https://nodejs.org)
- MongoDB — local install **or** free cloud at [MongoDB Atlas](https://www.mongodb.com/atlas)

#### Step 1 — Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/minicrm.git
cd minicrm
```

#### Step 2 — Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```env
MONGO_URI=mongodb://localhost:27017/minicrm
JWT_SECRET=your_long_random_secret_key_here
PORT=5000
CLIENT_URL=http://localhost:3000
```

> For MongoDB Atlas, your URI looks like:  
> `mongodb+srv://username:password@cluster.mongodb.net/minicrm`

#### Step 3 — Install and start the backend

```bash
npm install
npm run dev        # development mode (auto-restarts on file changes)
# OR
npm start          # production mode
```

You should see:
```
✅  MongoDB connected
🚀  Server running on http://localhost:5000
```

#### Step 4 — Open the frontend

Open `LeadFlow_CRM.html` directly in your browser. It will work with seed data out of the box. To connect it to your backend, replace the `fetch` calls with your `http://localhost:5000/api/leads` endpoints.

---

## 🔌 API Reference

All routes except `/api/auth/register` and `/api/auth/login` require the header:
```
Authorization: Bearer <your_jwt_token>
```

### 🔐 Auth Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/auth/register` | Create admin account |
| `POST` | `/api/auth/login` | Login — returns JWT token |
| `GET` | `/api/auth/me` | Get current logged-in user |

**Register / Login request body:**
```json
{
  "name": "Sravanthi Jampala",
  "email": "sravanthi@nexuscrm.com",
  "password": "securepassword123"
}
```

**Login response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "664abc...",
    "name": "Sravanthi Jampala",
    "email": "sravanthi@nexuscrm.com",
    "role": "admin"
  }
}
```

---

### 👥 Lead Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/leads` | List all leads (filters, sort, pagination) |
| `POST` | `/api/leads` | Create a new lead |
| `GET` | `/api/leads/:id` | Get a single lead by ID |
| `PATCH` | `/api/leads/:id` | Update any lead fields |
| `DELETE` | `/api/leads/:id` | Delete a lead permanently |

**Query parameters for `GET /api/leads`:**

| Param | Values | Example |
|-------|--------|---------|
| `q` | search text | `?q=priya` |
| `status` | new, contacted, qualified, converted, lost | `?status=new` |
| `source` | LinkedIn, Referral, etc. | `?source=LinkedIn` |
| `sort` | date_desc, date_asc, name, status | `?sort=date_desc` |
| `page` | page number | `?page=2` |
| `limit` | results per page | `?limit=10` |

**Create lead request body:**
```json
{
  "name": "Priya Nair",
  "email": "priya@medhaven.com",
  "company": "MedHaven",
  "phone": "+91 98765 43210",
  "source": "Contact Form",
  "status": "new",
  "note": "Interested in Scopus indexing for 3 journals."
}
```

---

### 📝 Notes Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/leads/:id/notes` | Add a follow-up note to a lead |
| `DELETE` | `/api/leads/:id/notes/:noteIndex` | Remove a note by index |

**Add note request body:**
```json
{
  "text": "Called today — they want a proposal by Friday."
}
```

---

### 📈 Analytics Endpoint

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/analytics` | Pipeline stats, conversion rate, breakdowns by status and source |

**Response:**
```json
{
  "total": 12,
  "converted": 3,
  "conversionRate": 25,
  "byStatus": [
    { "_id": "new", "count": 4 },
    { "_id": "contacted", "count": 3 },
    { "_id": "converted", "count": 3 }
  ],
  "bySource": [
    { "_id": "LinkedIn", "count": 4 },
    { "_id": "Referral", "count": 3 }
  ]
}
```

---

## 🧪 Sample API Requests

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Sravanthi Jampala","email":"sravanthi@example.com","password":"secret123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sravanthi@example.com","password":"secret123"}'

# Create a lead
curl -X POST http://localhost:5000/api/leads \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Priya Nair","email":"priya@medhaven.com","source":"Contact Form"}'

# Get all new leads, sorted by newest
curl "http://localhost:5000/api/leads?status=new&sort=date_desc" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Update lead status
curl -X PATCH http://localhost:5000/api/leads/LEAD_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"contacted"}'

# Add a follow-up note
curl -X POST http://localhost:5000/api/leads/LEAD_ID/notes \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"text":"Called today — wants a proposal by Friday."}'

# Get analytics
curl http://localhost:5000/api/analytics \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## ☁️ Deployment

### Backend → Railway (Recommended, Free Tier)

1. Push your code to GitHub
2. Go to [railway.app](https://railway.app) → **New Project → Deploy from GitHub**
3. Add a MongoDB plugin inside the project (or use Atlas URI)
4. Set environment variables: `MONGO_URI`, `JWT_SECRET`, `PORT`
5. Railway auto-detects Node.js and deploys

### Backend → Render (Alternative)

1. Go to [render.com](https://render.com) → **New Web Service**
2. Connect your GitHub repo
3. Build command: `npm install` | Start command: `node server.js`
4. Add environment variables under "Environment"
5. Deploy

### Frontend → GitHub Pages (Free, Instant)

Since the frontend is a single `.html` file:

1. Rename `LeadFlow_CRM.html` to `index.html` and push to your repo root
2. Go to repo **Settings → Pages**
3. Source: `main` branch → `/ (root)`
4. Your CRM is live at: `https://YOUR_USERNAME.github.io/minicrm/`

---

## 🤖 Setting Up Nova AI

1. Go to [console.anthropic.com](https://console.anthropic.com) and sign up (free credits included)
2. Navigate to **API Keys → Create Key**
3. Open `LeadFlow_CRM.html` in your browser
4. Paste your key into the **"Anthropic API Key"** field in the right panel
5. Click any quick-action button or type your own question

**Example questions to ask Nova:**
- *"Which leads should I prioritize this week?"*
- *"Draft a follow-up email for a lead who went cold after 5 days"*
- *"What is my conversion rate and how can I improve it?"*
- *"Which lead source is bringing the most qualified leads?"*
- *"Summarize my current pipeline in 3 bullet points"*

> **Privacy:** Your API key is used only in your browser to call Anthropic's API directly. It is never stored, logged, or sent to any other server.

---

## 💡 What I Built & Learned

### Technical Skills Demonstrated
- **Full CRUD operations** with Express.js and Mongoose
- **JWT Authentication** — register, login, token generation, and protected routes
- **Password security** — bcrypt hashing with 12 salt rounds
- **REST API design** — clean route structure, correct HTTP methods and status codes
- **MongoDB aggregation** — `$group` queries for analytics and reporting
- **Filtering, sorting, and pagination** — implemented on both frontend and backend
- **AI API integration** — calling Claude API with dynamic business context as system prompt
- **Single-file frontend** — complete application in one HTML file with zero dependencies

### Business Understanding Gained
- How lead pipelines work in real agencies and startups
- Why conversion rate tracking is critical for sales teams
- How timestamped follow-up notes create accountability
- How AI can act as a CRM co-pilot — analyzing data and drafting communications

---

## 👤 Author

**Sravanthi Jampala**  
Future Interns — Full Stack Web Development, Task 2 (2026)  
GitHub:https://github.com/sravanthijampala10-dev/FUTURE_FS_02
Email: sravanthi@email.com

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

> *"I built this system to manage real clients — from lead capture to conversion, with AI assistance at every step."*
