<img src="https://github.com/VladKolhanov/lexio/actions/workflows/ci.yml/badge.svg?branch=main" />

# 📚 LEXIO — AI Smart Dictionary

LEXIO is a modern, internationalized dictionary application and language learning platform built with **Next.js 16 (App Router)** and **React 19**. It provides a robust architecture, user authentication, security protection, and database persistence to help users learn foreign languages quickly and effectively.

---

## ✨ Features

- 🌐 **Internationalization (i18n)**: Out-of-the-box support for multiple locales (English `en` and Ukrainian `uk`) powered by `next-intl` with localized path routing.
- 🔐 **Secure Authentication**: Built-in credential and social login (Google OAuth) using **Better Auth**, including email verification, password reset, and registration checks.
- 🛡️ **Advanced Security & Protection**: Protected endpoints using **Arcjet** for bot detection, sliding-window rate limiting, and signup email validation (blocking disposable, invalid, or MX-record-less emails).
- 💾 **Data Persistence & ORM**: PostgreSQL database management using **Drizzle ORM** with support for serverless Neon PostgreSQL or local development via Docker.
- 📧 **Transactional Emails**: Email template rendering with **React Email** and integration with **Resend** for reset links and verification emails. Includes a local preview server script.
- 🎨 **Modern Aesthetics**: Premium, responsive user interface built using **Tailwind CSS v4** and **shadcn/ui** custom component structures.
- 🧪 **Comprehensive Testing**: Robust unit and integration testing suite configured with **Vitest** and V8 coverage tracking.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Security**: [Arcjet](https://arcjet.com/)
- **Database ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Database Engine**: PostgreSQL (via [Neon](https://neon.tech/) serverless or local PG)
- **Email Service**: [Resend](https://resend.com/) + [React Email](https://react.email/)
- **Testing**: [Vitest](https://vitest.dev/) + [jsdom](https://github.com/jsdom/jsdom)
- **Quality Assurance**: ESLint, Prettier, Husky git hooks

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (Latest LTS recommended)
- **pnpm** (Package manager, version `^10.24.0`)
- **Docker** (Optional, for running database locally)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/VladKolhanov/lexio.git
   cd lexio
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up your environment variables:
   ```bash
   cp .env.development.local.sample .env.development.local
   ```

---

## ⚙️ Environment Variables

Edit `.env.development.local` to fill in the required keys:

| Variable                      | Description                               | Example                                  |
| ----------------------------- | ----------------------------------------- | ---------------------------------------- |
| `NEXT_PUBLIC_BASE_URL`        | Base URL of the application               | `http://localhost:3000`                  |
| `NEXT_PUBLIC_APP_NAME`        | Name of the web app                       | `LEXIO`                                  |
| `NEXT_PUBLIC_APP_DESCRIPTION` | App tagline/description                   | `LEXIO – your personal dictionary...`    |
| `DB_DRIVER`                   | Database driver selector (`pg` or `neon`) | `pg`                                     |
| `DATABASE_URL`                | PostgreSQL connection string              | `postgres://user:pass@localhost:5430/db` |
| `BETTER_AUTH_SECRET`          | Secret key for Better Auth encryption     | _Generate with `openssl rand -hex 32`_   |
| `BETTER_AUTH_URL`             | Better Auth server endpoint               | `http://localhost:3000`                  |
| `GOOGLE_CLIENT_ID`            | Client ID for Google OAuth                | `your-google-client-id`                  |
| `GOOGLE_CLIENT_SECRET`        | Client Secret for Google OAuth            | `your-google-client-secret`              |
| `ARCJET_KEY`                  | Arcjet application security key           | `ajkey_...`                              |
| `RESEND_API_KEY`              | Resend mailing service API key            | `re_...`                                 |
| `RESEND_DOMAIN`               | Email sender configuration                | `<onboarding@resend.dev>`                |

---

## 💾 Database Setup

### Option A: Local Development with Docker

If you prefer to run Postgres locally, use the preconfigured docker script which automatically starts the service, applies migrations, and seeds the initial user:

```bash
# Start Docker Container, run migrations, and seed DB
pnpm docker:up
```

_Note: This creates a default admin account:_

- **Email:** `admin@gmail.com`
- **Password:** `12345678`

To stop the Docker container:

```bash
pnpm docker:down
```

### Option B: Remote Database (e.g. Neon)

If you are using Neon or another cloud PostgreSQL database, ensure your `DATABASE_URL` is set in `.env.development.local` and run:

```bash
# Push schema changes to remote database
pnpm db:push
```

---

## 🏃 Running the Application

1. Start the Next.js development server:

   ```bash
   pnpm dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## 📂 Project Structure

The project follows a modular, domain-driven directory structure:

```
src/
├── app/                  # Next.js App Router (routes, i18n locales, layouts, APIs)
│   ├── [locale]/         # Dynamic internationalization wrappers
│   └── api/              # API Route Handlers (e.g. Auth triggers)
├── domain/               # Core business features and page-specific layouts
│   ├── auth/             # Login, signup, forgot password forms & components
│   └── dictionary/       # Dictionary-related interactions (e.g. adding words)
├── infrastructure/       # Adapter layer, configurations, and external integrations
│   ├── arcjet/           # Arcjet security rules and route protectors
│   ├── auth/             # Better Auth server configuration and client
│   ├── db/               # Drizzle schemas, migrations, repositories, and seed script
│   ├── i18n/             # Translations messages (JSON) and locale routing rules
│   └── resend/           # React Email templates and mail delivery logic
└── shared/               # Shared utilities, hooks, providers, and general-purpose UI
    ├── components/       # Reusable UI component library (custom/shadcn components)
    ├── errors/           # Custom exception definitions and global error handlers
    ├── hooks/            # Custom utility hooks (e.g. forms, timers)
    └── utils/            # General helper utilities (e.g. debounce, local storage)
```

---

## 📜 Available Scripts

- `pnpm dev`: Starts the Next.js local development server.
- `pnpm build`: Compiles the application for production.
- `pnpm start`: Runs the built production server locally.
- `pnpm lint`: Lints project files and auto-fixes issues.
- `pnpm format`: Formats code using Prettier.
- `pnpm type-check`: Validates TypeScript typing constraints without emitting files.
- `pnpm test`: Runs test suite once.
- `pnpm test:watch`: Runs tests in watcher mode.
- `pnpm test:coverage`: Generates code coverage reports.
- `pnpm db:generate`: Generates SQL migrations files from schema definition.
- `pnpm db:migrate`: Applies migrations to the database.
- `pnpm db:push`: Pushes schema definitions directly to database.
- `pnpm db:studio`: Starts Drizzle Studio GUI on port `5433`.
- `pnpm email:dev`: Opens the React Email development preview server on port `3100`.
- `pnpm email:build`: Compiles the email templates.
