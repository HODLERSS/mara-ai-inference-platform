# MARA AI Inference Platform (Project Sapien)

Building an Inference-as-a-Service platform to deliver sovereign-ready, sub-120 µs/token inference to enterprise customers at 30-50% lower cost than hyperscalers.

## Tech Stack

- **Frontend**: Next.js 14 App Router, React 18 Server Components, TypeScript (strict mode)
- **UI**: MUI v6 with Emotion styling
- **Forms**: React Hook Form + Zod validation
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Testing**: Vitest + Testing Library + Playwright
- **Deployment**: Vercel

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and other secrets
   ```

3. **Set up the database**:
   ```bash
   npm run db:push
   npm run db:generate
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Run tests**:
   ```bash
   npm test              # Unit tests
   npm run test:e2e      # E2E tests
   npm run typecheck     # TypeScript check
   npm run lint          # ESLint
   ```

## Project Structure

```
app/
├── (auth)/              # Route groups for auth pages
├── api/                 # Route handlers
├── dashboard/           # Dashboard pages
├── globals.css          # Global styles
├── layout.tsx           # Root layout
└── page.tsx             # Home page

components/
├── forms/               # Form components with Zod validation
├── providers/           # Context providers
└── ui/                  # Reusable UI components

lib/
├── auth.ts              # NextAuth configuration
├── db.ts                # Prisma client
├── schemas.ts           # Zod schemas
├── theme.ts             # MUI theme
└── utils.ts             # Utility functions

prisma/
├── schema.prisma        # Database schema
└── migrations/          # Database migrations

tests/
├── components/          # Component tests
├── e2e/                # E2E tests
└── setup.ts            # Test setup
```

## Key OKRs (Deadline: December 19, 2025)

- **Technological Feasibility**: ≥99% availability, 3 LLMs, 3 compute platforms
- **Financial Viability**: 2 design partners, >40% gross margin
- **Product-Market Fit**: NPS ≥30, customer expansion requests

## Development Guidelines

- SSR-first architecture with Server Components
- Strict TypeScript with no `any` types
- MUI-only for UI components
- Tiny, composable files
- Zero workarounds or hacks
- Comprehensive testing coverage

## Demo Access

**Live Demo**: [Coming Soon - Will be deployed to Vercel]

**Demo Credentials**:
- **Email**: `minjAI@mara.com`
- **Password**: `maradigital`

## Deployment

### Quick Deploy to Vercel (Recommended)

1. **Fork/Clone this repository** to your GitHub account

2. **Sign up for Vercel** at [vercel.com](https://vercel.com) with your GitHub account

3. **Import your repository** - Vercel will auto-detect it's a Next.js project

4. **Configure environment variables** in Vercel dashboard:
   ```
   NEXTAUTH_SECRET=mara-ai-production-secret-key-2024-enterprise-grade-security
   NEXTAUTH_URL=https://your-project-name.vercel.app
   ```

5. **Deploy** - Vercel will automatically build and deploy your app

6. **Share the live URL** with your team using the demo credentials above

### Alternative: Manual Deployment

For other platforms (Netlify, Railway, etc.):

```bash
# Build the project
npm run build

# Start production server
npm start
```

Environment variables needed for production:
- `NEXTAUTH_SECRET` (required)
- `NEXTAUTH_URL` (required)
- `DATABASE_URL` (optional - uses mock data)
- `GITHUB_ID` (optional)
- `GITHUB_SECRET` (optional)