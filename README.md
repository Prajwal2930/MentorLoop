# MentorLoop

MentorLoop is a developer-growth workspace for students and early-career engineers. It brings the practical parts of career preparation into one place: a skills profile, AI-assisted code feedback, GitHub project reviews, a learning roadmap, mock interviews, and career analytics.

The idea is simple: instead of jumping between disconnected tools, a learner can see where they are, decide what to practise next, and keep evidence of progress in one product.

## What it includes

- Secure registration and login with JWT authentication
- Personal profile, GitHub connection, skills, and onboarding flow
- AI code analysis with structured feedback, practice tasks, and interview questions
- GitHub repository reviews focused on portfolio and resume value
- A personalised weekly learning roadmap with progress tracking
- AI mock interviews with scores, feedback, and interview history
- Career analytics built from skills, roadmaps, reviews, analyses, and interviews
- Responsive React interface with Tailwind CSS, Framer Motion, Sonner notifications, and a production-friendly API client

## Stack

| Area | Technology |
| --- | --- |
| Client | React, Vite, React Router, Tailwind CSS, Axios, Context API |
| Server | Node.js, Express, Mongoose |
| Database | MongoDB / MongoDB Atlas |
| Authentication | JWT and bcrypt |
| AI | Google Gemini via `@google/genai` |
| Integrations | GitHub REST API |

## Project layout

```text
MentorLoop/
├── backend/       # Express API, database models, AI and GitHub services
├── frontend/      # Vite + React application
├── render.yaml    # Optional Render Blueprint
└── README.md
```

## Run locally

Use Node.js 18 or later. MongoDB must be available locally or through Atlas.

```bash
# From the repository root
npm install
npm run both
```

The command starts the frontend at `http://localhost:5173` and the API at `http://localhost:5000`.

Install dependencies for both applications first if they are not already installed:

```bash
npm install --prefix backend
npm install --prefix frontend
```

### Backend environment

Create `backend/.env` from `backend/.env.example`:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=use_a_long_random_secret
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_google_gemini_key
GEMINI_MODEL=gemini-2.5-flash
GITHUB_TOKEN=optional_github_personal_access_token
```

### Frontend environment

Create `frontend/.env` from `frontend/.env.example`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Only values prefixed with `VITE_` are exposed to the browser. Never place the JWT secret, Gemini key, MongoDB URL, or GitHub token in the frontend environment file.

## Deploy on Render

The repository includes `render.yaml`, but the same settings can be entered through the Render dashboard.

### 1. Deploy the API

Create a **Web Service** with these settings:

| Setting | Value |
| --- | --- |
| Root directory | `backend` |
| Build command | `npm ci` |
| Start command | `npm start` |
| Health check path | `/api/health` |

Set these environment variables in Render:

```env
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=a_long_random_production_secret
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_google_gemini_key
GEMINI_MODEL=gemini-2.5-flash
GITHUB_TOKEN=optional_github_token
CLIENT_URL=https://your-frontend-name.onrender.com
```

Render provides `PORT` automatically; do not hard-code it. Once the service is live, confirm that `https://your-api-name.onrender.com/api/health` returns a success response.

### 2. Deploy the frontend

Create a **Static Site** with these settings:

| Setting | Value |
| --- | --- |
| Root directory | `frontend` |
| Build command | `npm ci && npm run build` |
| Publish directory | `dist` |

Add this build-time environment variable:

```env
VITE_API_BASE_URL=https://your-api-name.onrender.com/api
```

Add an SPA rewrite rule in Render so direct visits to routes such as `/dashboard` continue to work:

| Source | Destination | Type |
| --- | --- | --- |
| `/*` | `/index.html` | Rewrite |

Finally, copy the deployed frontend URL into the API service's `CLIENT_URL` variable and redeploy the API. If you use a custom domain, add that full origin too. Multiple origins can be supplied as a comma-separated list.

## Useful commands

```bash
# API development server
npm run dev --prefix backend

# Frontend development server
npm run dev --prefix frontend

# Verify a frontend production build
npm run build --prefix frontend
```

## Notes

- Keep `.env` files out of version control. They contain secrets and deployment-specific values.
- GitHub review works without a token for public repositories, but a token gives better API rate limits.
- The AI features need a valid Gemini API key before they can return analyses, reviews, roadmaps, or interview feedback.
