# ⚡ Vite + Express Fullstack Setup

A custom fullstack setup combining **Vite** for the frontend and **Express.js** for the backend. Vite runs in middleware mode to give you lightning-fast HMR, while Express gives you full control over server-side logic.

---

## 📦 Features

- 🚀 Vite in **middleware mode** inside Express
- 🔁 Hot Module Replacement (HMR) for fast dev
- 🎭 Custom HTML template injection via `nanoid` (for cache busting)
- 🛠️ Build and serve production-ready static assets
- ⚙️ Full backend control with Express.js
- 🧠 Clean, modular project structure

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

This will:
- Start your Express server
- Mount Vite in middleware mode
- Serve `client/index.html` with dynamic HMR
- Let you use all Vite + React features during dev

### 3. Build for Production

```bash
npm run build
```

This will:
- Run Vite’s production build
- Output static files to `/server/public`

Then serve them with:

```bash
npm run serve
```

⚠️ **Make sure to run `build` before `serve`.** The `serve` command depends on the compiled static assets.

---

## 🔧 Scripts

| Script         | Description                                      |
|----------------|--------------------------------------------------|
| `npm run dev`  | Start Express + Vite in dev mode with HMR       |
| `npm run build`| Build the Vite client for production            |
| `npm run serve`| Serve the production build using Express        |
| `npm run lint` | (Optional) Run linter if you have ESLint configured |

---

## 📁 Project Structure

```
.
├── client/                     # Frontend (Vite + React)
│   ├── index.html              # Entry HTML
│   └── src/                    # React source code
├── server/                     # Backend (Express)
│   ├── index.ts                # Express entry point
│   └── vite.ts                 # Vite middleware setup
├── public/                     # Static files (for prod)
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript config
├── package.json                # Project dependencies and scripts
└── README.md                   # This file
```

---

## 🔐 Environment Variables

You can create a `.env` file at the root for secrets, API keys, and config values:

```ini
PORT=3000
API_URL=https://your-api.com
```