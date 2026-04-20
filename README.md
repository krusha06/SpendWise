# SpendWise 💰
A personal finance dashboard to track expenses, visualize spending patterns, and stay within budget.

🔗 **Live Demo:** [spendwise-krusha.vercel.app](https://your-url.vercel.app)

---

## Features
- 🔐 Secure authentication (Supabase Auth)
- ➕ Full expense CRUD — add, edit, delete transactions
- 🏷️ Category tagging with color coding
- 🔍 Filter by category, month, and search
- 📊 Spending breakdown by category (Pie chart)
- 📈 Monthly spending trend (Bar chart)
- 💳 Budget limit with real-time progress bar and alerts
- 📱 Fully responsive — works on mobile and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript |
| State Management | Zustand |
| Backend / Auth | Supabase (PostgreSQL + Auth) |
| Charts | Recharts |
| Styling | Tailwind CSS |
| Testing | Jest + React Testing Library |
| CI/CD | GitHub Actions |
| Deployment | Vercel |

---

## Architecture Decisions

**Zustand over Redux** — For a mid-size app like this, Zustand provides all the state management needed without Redux boilerplate. The store is co-located with selectors and async actions in one file.

**Supabase over custom backend** — Supabase provides auth, PostgreSQL, and REST APIs out of the box. Row Level Security ensures users only access their own data — no custom auth middleware needed.

**Vite over CRA** — Significantly faster dev server and build times. Native TypeScript and ESM support.

---

## Running Locally

```bash
git clone https://github.com/krusha06/spendwise.git
cd spendwise
npm install
```

Create `.env` file:
```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

```bash
npm run dev
```

---

## Running Tests

```bash
npm test              # run all tests
npm run test:coverage # with coverage report
```

---
