# MentorLoop

MentorLoop is the project I built to make developer career preparation feel less scattered.

As a student or early-career developer, it is easy to collect tutorials, build a few projects, practise random interview questions, and still not know what to do next. I wanted one place that could connect those pieces. MentorLoop helps a learner understand their current skills, get feedback on code and GitHub projects, follow a focused learning plan, and practise interviews with useful feedback.

This is not meant to replace learning by doing. The goal is to make the next step clearer.

## What MentorLoop can do

- Create an account and build a developer profile
- Track technical skills and confidence levels
- Analyse code and receive structured feedback, best practices, practice tasks, and interview questions
- Review a public GitHub repository for portfolio value, strengths, gaps, and suggested improvements
- Generate a personalised weekly learning roadmap from the user's profile and activity
- Run AI-powered mock interviews and save the results
- Show career analytics based on skills, roadmaps, code analyses, project reviews, and interviews

## A quick look at the stack

| Part of the project | What I used |
| --- | --- |
| Frontend | React, Vite, React Router, Tailwind CSS, Axios, Context API |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB / MongoDB Atlas |
| Authentication | JWT and bcrypt |
| AI features | Google Gemini through `@google/genai` |
| Project data | GitHub REST API |
| UI polish | Framer Motion, Lucide React, Sonner |

## Project structure

```text
MentorLoop/
├── backend/       # Express API, models, controllers, services, and middleware
├── frontend/      # React application and user interface
├── render.yaml    # Render deployment blueprint
└── README.md
```

## Running it on my machine

You will need Node.js 18+ and a MongoDB database. MongoDB Atlas works well if you do not want to run MongoDB locally.

Install the dependencies once:

```bash
npm install --prefix backend
npm install --prefix frontend
```

Then, from the repository root, start both applications:

```bash
npm run both
```

The frontend runs at `http://localhost:5173` and the API runs at `http://localhost:5000`.

### Backend environment

Copy `backend/.env.example` to `backend/.env` and fill in your own values:

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

Copy `frontend/.env.example` to `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Only `VITE_` values are available in the browser. I keep secrets such as the MongoDB URL, JWT secret, Gemini key, and GitHub token in the backend environment only.

## Deploying on Render

The project is set up as two services: an Express API and a Vite static site. `render.yaml` is included if you prefer a Render Blueprint, but the same values can be entered in the Render dashboard.

### Backend: Render Web Service

| Render setting | Value |
| --- | --- |
| Root Directory | `backend` |
| Build Command | `npm ci` |
| Start Command | `npm start` |
| Health Check Path | `/api/health` |

Set these values in the backend service environment settings:

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

Render assigns `PORT` automatically, so it should not be set manually. After deployment, open:

```text
https://your-api-name.onrender.com/api/health
```

You should see a success response.

### Frontend: Render Static Site

| Render setting | Value |
| --- | --- |
| Root Directory | `frontend` |
| Build Command | `npm ci && npm run build` |
| Publish Directory | `dist` |

Add this build-time environment variable:

```env
VITE_API_BASE_URL=https://your-api-name.onrender.com/api
```

Because React Router handles routes in the browser, add this Render rewrite rule:

| Source | Destination | Action |
| --- | --- | --- |
| `/*` | `/index.html` | Rewrite |

Once the frontend has a URL, copy that exact origin into the backend's `CLIENT_URL` setting and redeploy the backend. This allows the deployed frontend to call the API safely.

### If Render shows a blank page or `/assets/...` 404

That normally means `index.html` was published without its matching Vite files. The important part is that, with `frontend` set as the root directory, the publish directory must be just `dist` not `frontend/dist`.

After correcting the setting, use **Manual Deploy → Clear build cache & deploy**. The deployment log should list files under `dist/assets/`, and the browser should request the same hashed asset names that appear in that log.

## How Codex and GPT-5.6 helped me build it

I used Codex and GPT-5.6 as a hands-on development partner while building MentorLoop. They helped me move from an initial idea to a working full-stack project by breaking the work into smaller milestones and checking each part as it came together.

In practice, they helped me with:

- Planning the project structure so the React frontend and Express backend stayed organised as features grew
- Building and reviewing API routes, models, JWT protection, validation, and MongoDB integration
- Designing the AI service layer so Gemini-related code stayed separate from controllers and routes
- Connecting the frontend to real backend responses and tracking down issues during onboarding, skills, roadmaps, and deployment
- Improving the dashboard, loading states, responsive design, and accessibility without removing the existing product flow
- Writing deployment notes and helping me understand issues such as CORS, Atlas response time, environment variables, and static-site asset paths

The product decisions, feature direction, testing, configuration, and final choices are still mine. I treated AI as a fast collaborator for explaining options, generating starting points, and debugging not as something that could understand the project without my review.

## Useful commands

```bash
# Start only the API
npm run dev --prefix backend

# Start only the frontend
npm run dev --prefix frontend

# Create a production frontend build
npm run build --prefix frontend
```

## A small note on secrets

`.env` files are ignored by Git for a reason. Please do not commit your Atlas URI, Gemini key, JWT secret, or GitHub token. If a key is ever exposed, revoke it and create a new one.
