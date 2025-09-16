# MARA AI Inference Platform - Codebase Analysis
**Date:** September 15, 2025

## Project Overview
**Type:** Next.js 14 Application
**Purpose:** AI Inference-as-a-Service Platform (Project Sapien)
**Stack:** TypeScript, React 18, MUI 5, Prisma, PostgreSQL, NextAuth

## Directory Structure

### `/app` - Next.js App Router Pages
- **`(auth)/`** - Authentication routes (signin, register) with grouped layout
- **`api/`** - API endpoints (auth via NextAuth, inference endpoint)
- **Individual pages:** dashboard, admin, api-keys, billing, cost-analysis, marketplace, performance, playground, settings, slo-monitoring
- **Core files:** layout.tsx (root), page.tsx (landing), loading.tsx, not-found.tsx

### `/components` - React Components (Atomic Design)
**Feature-specific:**
- **`api-keys/`** - API key management, usage analytics
- **`billing/`** - Billing dashboard
- **`charts/`** - Performance, savings, usage visualizations (Recharts)
- **`dashboard/`** - Main dashboard client component
- **`forms/`** - Login, registration, inference forms (react-hook-form + Zod)
- **`models/`** - API code dialog, deployment dialog
- **`monitoring/`** - SLO monitoring dashboard
- **`onboarding/`** - Welcome flow
- **`playground/`** - API playground, code generator
- **`settings/`** - Settings dashboard

**Core UI:**
- **`layout/`** - Navbar, footer
- **`providers/`** - Auth, theme providers
- **`ui/`** - Reusable components (cards, calculator, theme toggle)

### `/lib` - Utilities & Configuration
- **`auth.ts`** - NextAuth configuration
- **`db.ts`** - Prisma client singleton
- **`schemas.ts`** - Zod validation schemas
- **`theme-context.tsx`** - Theme management
- **`theme.ts`** - MUI theme configuration
- **`utils.ts`** - Helper functions

### `/prisma` - Database
- **PostgreSQL** schema with models:
  - User (roles: ADMIN/USER)
  - Account, Session (NextAuth)
  - InferenceRequest (tracking API usage)
  - VerificationToken

### `/tests` - Testing
- **Unit:** Vitest for components
- **E2E:** Playwright for auth flows

### Configuration Files
- **Next.js:** next.config.js, vercel.json
- **TypeScript:** tsconfig.json (strict mode)
- **Testing:** vitest.config.ts, playwright.config.ts
- **Environment:** .env.local, .env.production
- **Package management:** package.json (missing package-lock.json)

## Key Features
1. **Authentication:** NextAuth with PostgreSQL adapter
2. **Dashboard:** Performance metrics, usage tracking
3. **API Management:** Key generation, usage analytics
4. **Billing:** Cost tracking, calculator
5. **Playground:** Interactive API testing, code generation
6. **Monitoring:** SLO tracking, performance charts
7. **Marketplace:** Model deployment interface
8. **Dark Mode:** Theme switching support

## Design Principles (from CLAUDE.md)
- MUI components only (no raw HTML)
- 200 lines max per file
- DRY, Atomic Design pattern
- Full TypeScript typing
- SSR first approach
- Minimal client components

## Tech Debt & Issues
- Missing package-lock.json (deleted in git)
- TypeScript strict mode recently fixed
- Dark mode set as default

## Uncertainty Map
**Least confident about:**
- Actual inference backend implementation details (appears to be mocked/placeholder)
- Integration with real AI models (H100/H200, SambaNova, Etched mentioned in docs)
- Production deployment specifics beyond Vercel configuration

**Oversimplifications:**
- Assumed standard NextAuth flow without custom middleware
- Inference API complexity reduced to basic route handler
- Real-time monitoring capabilities not fully assessed

**Follow-up questions that would change opinion:**
- Is there a separate inference service/microservice architecture?
- What's the actual model deployment pipeline?
- How are GPU resources allocated and managed?

## Quick Career Advice
1. **Document the inference architecture** - Create technical design docs showing how models are deployed, scaled, and monitored to demonstrate system design expertise.
2. **Build performance benchmarking dashboard** - Add real-time latency tracking and cost-per-token metrics to prove the 30-50% cost savings claim with data.
3. **Create customer success playbooks** - Document onboarding flows and integration patterns for design partners to show product leadership beyond just technical execution.