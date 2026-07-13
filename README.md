# SatPat Build

> Live site: not published yet

SatPat Build is an AI-assisted workspace for turning a rough idea into a usable frontend starting point. Instead of generating a full website in one step, it focuses on one interface at a time: a landing page section, dashboard panel, signup screen, pricing card, or similar UI block. Users can describe what they want in chat, review the generated HTML in a live preview, refine selected elements, save the project, and export the result for use elsewhere.

> Note: this project uses a non-reasoning model, so it does not retain or reuse information from previous chats unless it is explicitly saved within the project workspace.

The product is intentionally designed for fast iteration. It helps bridge the gap between an idea and a tangible, editable mockup without requiring a fully polished prompt or a handcrafted implementation from the beginning.

## Why this project exists

SatPat Build is meant for the early design-and-build moment:

- turn a written concept into a visual prototype quickly
- iterate on structure and styling without switching tools constantly
- work inside a focused project workspace rather than creating one-off files
- generate HTML that can be inspected, adjusted, and exported

It is especially useful for product teams, solo founders, and developers who want a quick visual starting point before diving deeper into implementation.

## Current status

SatPat Build is still in an active testing phase. The experience is free to use while the core workflow is being validated, and some premium-oriented labels such as upgrades and pricing remain intentionally unavailable during this period.

Generated output should be treated as a strong starting point rather than a final product. The app is built to learn from real usage, improve prompt handling, make editing more reliable, and produce exports that are easier to adapt in real frontend projects.

## Core features

- Secure sign-up and login flow with JWT-based authentication and HTTP-only cookies
- Dashboard experience for managing multiple projects
- Project-based workspace for storing chat history and generated code
- AI streaming chat interface powered by OpenRouter
- Live preview inside an editable iframe
- Click-to-select elements and edit their content or styling
- Desktop/mobile preview toggle for responsive checking
- Code view and copy/export actions for plain HTML and React component output
- Sidebar navigation for browsing projects, credits, and logout actions

## How the workflow works

1. Create an account or log in.
2. Open the dashboard and create a new project.
3. Describe the UI you want to build in the chat panel.
4. Review the streamed HTML in the preview panel.
5. Click elements in the preview to edit them directly.
6. Save the project to preserve the code and conversation.
7. Export the result as plain HTML or a React component when you are ready.

Example prompts include:

- “Create a modern pricing section for a SaaS product with monthly and yearly options.”
- “Build a dashboard panel with analytics cards and a sidebar.”
- “Generate a clean signup screen with a hero section and footer.”

## Tech stack

SatPat Build is built with a modern Next.js-based stack:

- [Next.js](https://nextjs.org/) with the App Router
- React 19
- Tailwind CSS and shadcn-style UI primitives
- PostgreSQL via the `pg` package
- JWT-based authentication with HTTP-only cookies
- OpenRouter streaming chat completions for UI generation
- Lucide icons and React Syntax Highlighter

## Architecture overview

The app is organized around a small but clear set of responsibilities:

- App Router pages handle the public landing page, dashboard, login, signup, and project workspace
- API routes process authentication, project creation, project persistence, and AI chat generation
- The project workspace combines a chat panel, an iframe preview, an element editor, and export tools
- A PostgreSQL database stores users, projects, and associated chat state

## Project structure

```text
satpat-build/
├── public/                          # Static assets such as logos and images
├── src/
│   ├── app/                         # Next.js App Router pages and route handlers
│   │   ├── api/                     # Backend endpoints for auth, chat, and projects
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   ├── logout/
│   │   │   │   └── signup/
│   │   │   ├── chat/
│   │   │   ├── projects/
│   │   │   │   ├── create/
│   │   │   │   └── [id]/
│   │   │   └── test/
│   │   ├── dashboard/
│   │   │   ├── projects/
│   │   │   │   └── [id]/
│   │   │   └── setting/
│   │   ├── login/
│   │   ├── projects/
│   │   │   ├── _components/
│   │   │   └── [id]/
│   │   ├── signup/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/                  # Reusable UI components and shadcn-style primitives
│   │   ├── ui/
│   │   ├── app-header.jsx
│   │   ├── app-sidebar.jsx
│   │   ├── hero.js
│   │   ├── login-form.jsx
│   │   ├── newProjectModal.js
│   │   └── signup-form.jsx
│   ├── context/                     # Dashboard context providers and helpers
│   ├── hooks/                       # Custom React hooks
│   └── lib/                         # Auth, database, and utility modules
│       ├── aiPrompt.js
│       ├── auth.js
│       ├── checkUser.js
│       ├── db.js
│       └── utils.js
├── components.json                  # shadcn/ui component configuration
├── eslint.config.mjs                # ESLint configuration
├── jsconfig.json                    # JavaScript path aliases
├── next.config.mjs                  # Next.js config
├── package.json                     # Project dependencies and scripts
├── postcss.config.mjs               # PostCSS configuration
└── README.md                        # Project documentation
```

## Important files

- [src/app/projects/[id]/page.js](src/app/projects/[id]/page.js) – loads a project, streams AI output, and saves updates
- [src/app/projects/_components/Chats.js](src/app/projects/_components/Chats.js) – chat interface for sending prompts
- [src/app/projects/_components/WebsiteDes.js](src/app/projects/_components/WebsiteDes.js) – iframe preview, live element selection, and editing behavior
- [src/app/projects/_components/Element.js](src/app/projects/_components/Element.js) – controls for editing the selected preview element
- [src/app/projects/_components/Tool.js](src/app/projects/_components/Tool.js) – preview controls, code viewing, and export actions
- [src/components/app-sidebar.jsx](src/components/app-sidebar.jsx) – project navigation, credits display, and logout flow

## Local development

### Prerequisites

Make sure you have:

- Node.js 20 or later
- npm
- A PostgreSQL database instance
- An OpenRouter API key

### Installation

```bash
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
JWT_SC=replace-with-a-long-random-secret
APIKEY=your-openrouter-api-key
```

### Database setup

The application expects PostgreSQL tables for users, projects, and chats. A simple schema could look like this:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  credits INT DEFAULT 10
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT DEFAULT '',
  chats JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE chats (
  id SERIAL PRIMARY KEY,
  created_by TEXT NOT NULL,
  project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE
);
```

### Run the app

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Available scripts

```bash
npm run dev      # start the local development server
npm run lint     # run ESLint
npm run build    # create a production build
npm run start    # run the production server after building
```

## Current limitations

- Generated output is AI-produced and should be reviewed, tested, and adapted before production use
- The React export preserves generated markup inside a component; more advanced interactions may still need to be rebuilt manually
- Some premium or upgrade flows remain disabled during the testing period
- The preview relies on external CDN libraries when needed, so availability can vary depending on the runtime environment

## Contributing

Contributions are welcome. If you want to improve the experience, please:

1. Fork the repository and create a feature branch
2. Keep changes focused and avoid unrelated formatting changes
3. Test the relevant workflow locally and run `npm run lint`
4. Open a pull request with a clear explanation of the problem and solution

Bug reports and feature ideas are especially valuable when they include steps to reproduce, expected behavior, and actual behavior.

## License

Add an appropriate license before public distribution.
