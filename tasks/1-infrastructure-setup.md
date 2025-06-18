# 1.0 Infrastructure & Project Setup

## Overview

Set up a modern Next.js 15 SPA with Supabase backend, focusing on performance and developer experience.

**⚠️ Backend Migration Plan**: We'll initially use Next.js API routes for rapid prototyping, but plan to migrate to a dedicated Express.js or Fastify backend later for better performance and separation of concerns. All backend code should be designed with this migration in mind.

## Tech Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Backend**: Next.js API routes (temporary) → Express.js/Fastify (planned migration)
- **Database**: Supabase (PostgreSQL with pgvector)
- **Auth**: Supabase Auth with passwordless magic links + Social OAuth
- **Styling**: Tailwind CSS 4.0 + shadcn/ui v2
- **State**: Zustand + React Query v5 (TanStack Query)
- **Testing**: Vitest + Testing Library + Playwright
- **Type Safety**: TypeScript 5.5+
- **Animations**: Framer Motion 11
- **AI**: OpenAI SDK v4 + Vercel AI SDK

## Migration Considerations

When implementing backend functionality:

- Keep API logic modular and easily extractable
- Use service layer pattern for business logic
- Minimize Next.js-specific dependencies in backend code
- Structure code for easy migration to standalone backend server
- Consider using shared types/interfaces between frontend and backend

## Tasks

### 1.1 Project Foundation ✅

- [x] Create Next.js 15 project with TypeScript
  ```bash
  npx create-next-app@latest lifelogs --typescript --tailwind --app --src-dir
  ```
- [x] Configure `next.config.js` for SPA mode and optimizations
- [x] Set up `.env.local` with all required environment variables
- [x] Configure `tsconfig.json` with strict mode and path aliases

### 1.2 Database & Backend Setup ✅

- [x] Create Supabase project and get credentials
- [x] Enable pgvector extension in Supabase dashboard
- [x] Create database schema with pgvector support for embeddings
- [x] Set up database migrations workflow (SQL migrations)
- [x] Configure Row Level Security (RLS) policies
- [x] **NEW**: Extended schema with structured content types (milestones, yearly overviews, goals)

**Collaboration Features**: Added comments and sharing system with proper RLS policies for secure multi-user interaction.

**Structured Content Support**: Extended the memories table with `content_type` and `content_schema_version` fields, plus a `content_templates` table for defining structured data schemas. This supports:

- **Milestones**: Life achievements with categories, impact scores, and reflection
- **Yearly Overviews**: Annual life reviews tracking multiple dimensions (career, relationships, travel, etc.)
- **Goals**: Progress tracking with milestones, priorities, and status updates
- **Extensible**: Plugin-like system for adding new content types

### 1.3 Authentication & Security ✅

- [x] Set up modern passwordless authentication with Supabase Auth
- [x] Implement magic link authentication (primary method)
- [x] Add social OAuth providers (Google, Apple, GitHub)
- [x] Create authentication library with TypeScript types
- [x] Build modern signup/signin UI components
- [x] Set up auth callback handling and error states
- [x] Add email type detection (work vs personal)

**Modern Authentication Approach**: Implemented ultra-modern registration patterns following industry leaders:

- **Primary**: Magic link authentication (passwordless)
- **Secondary**: Social OAuth with Google, Apple, and GitHub
- **Progressive Disclosure**: Email-first approach with minimal friction
- **Smart Features**: Work email detection, real-time validation, loading states
- **Trust Indicators**: Security badges, privacy messaging, and clear CTAs

### 1.4 UI & Styling Foundation

- [x] Install and configure Tailwind CSS 4.0
- [x] Set up shadcn/ui v2 with custom theme
- [x] Create design system tokens (colors, typography, spacing)
- [x] Install and configure Framer Motion for animations
- [ ] Set up CSS custom properties for theme switching

### 1.5 State Management & Data Fetching

- [ ] Install TanStack Query v5 for server state
- [ ] Set up Zustand for client state management
- [ ] Configure optimistic updates and caching strategies
- [ ] Set up real-time subscriptions with Supabase
- [ ] Create custom hooks for common operations

### 1.6 AI & Search Infrastructure

- [ ] Set up OpenAI account and get API key (GPT-4o, text-embedding-3-large)
- [ ] Install Vercel AI SDK for streaming responses
- [ ] Configure pgvector for similarity search
- [ ] Set up background job processing (Vercel Cron or Supabase Edge Functions)
- [ ] Create embeddings generation pipeline

### 1.7 Development & Testing Setup

- [ ] Configure Vitest for unit/integration testing
- [ ] Set up Testing Library for component testing
- [ ] Install Playwright for E2E testing
- [ ] Configure ESLint with TypeScript and React rules
- [ ] Set up Prettier with Tailwind plugin
- [ ] Create GitHub Actions for CI/CD

### 1.8 Monitoring & Analytics

- [ ] Set up Vercel Analytics and Speed Insights
- [ ] Configure error tracking (Sentry or similar)
- [ ] Set up performance monitoring
- [ ] Create logging strategy for debugging

### 1.9 External Integrations Setup

- [ ] Create Google Cloud Console project
- [ ] Set up OAuth 2.0 for Gmail and Google Calendar APIs
- [ ] Configure scopes and permissions for read-only access
- [ ] Set up webhook endpoints for real-time updates

### 1.10 Performance Optimization

- [ ] Configure Next.js bundle analyzer
- [ ] Set up image optimization with Supabase Storage
- [ ] Configure caching strategies (Redis if needed)
- [ ] Set up CDN and edge functions
- [ ] Implement code splitting and lazy loading

## Environment Variables Required

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://wavgoynpcyrcfwhqyavf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI
OPENAI_API_KEY=

# Google APIs (for OAuth and future integrations)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Database
DATABASE_URL=postgresql://postgres:2B2EZKc8Nhz$w_p@db.wavgoynpcyrcfwhqyavf.supabase.co:5432/postgres

# Other
NODE_ENV=development
```

## Success Criteria

- [x] Project builds and runs without errors
- [x] Database connection and migrations working
- [x] Structured content types system implemented
- [x] Modern authentication flow functional
- [ ] AI API connections established
- [ ] Testing environment configured
- [ ] Deployment pipeline ready

## Relevant Files

- `lifelogs/` - Next.js 15 project with TypeScript, Tailwind CSS, App Router, and src directory structure
- `lifelogs/next.config.ts` - Next.js configuration with SPA mode, static export, image optimization, and performance settings
- `lifelogs/.env.local` - Environment variables file with all required API keys and configuration (placeholder values)
- `lifelogs/tsconfig.json` - Enhanced TypeScript configuration with strict mode and comprehensive path aliases
- `lifelogs/database/migrations/001_initial_schema.sql` - Complete SQL migration with pgvector support for Supabase
- `lifelogs/database/migrations/002_rls_policies.sql` - Comprehensive RLS policies with collaboration features (comments, sharing)
- `lifelogs/database/migrations/003_comprehensive_lifelogs_schema.sql` - Full LifeLog OS schema with advanced features
- `lifelogs/database/migrations/004_content_types_extension.sql` - **NEW**: Structured content types support with templates
- `lifelogs/src/lib/supabase.ts` - Supabase client configuration with helper functions for database operations, comments, and sharing
- `lifelogs/src/lib/auth.ts` - **NEW**: Modern authentication library with passwordless and social OAuth support
- `lifelogs/src/components/auth/SignUpForm.tsx` - **NEW**: Ultra-modern signup form with magic links and social OAuth
- `lifelogs/src/app/auth/signup/page.tsx` - **NEW**: Signup page with error handling and user onboarding
- `lifelogs/src/app/auth/callback/page.tsx` - **NEW**: Auth callback handler for OAuth and magic link flows
- `lifelogs/src/types/database.ts` - **UPDATED**: Comprehensive TypeScript type definitions including structured content types
- `lifelogs/src/types/supabase.ts` - Basic Supabase type definitions (to be enhanced)
- `lifelogs/src/lib/animations.ts` - **NEW**: Comprehensive Framer Motion animation utilities and variants for consistent animations
- `lifelogs/src/components/ui/AnimatedCard.tsx` - **NEW**: Demo animated card component showcasing Framer Motion integration
- `lifelogs/src/app/test-animations/page.tsx` - **NEW**: Test page to verify Framer Motion animations are working properly

## Authentication Implementation Details

The authentication system follows the most modern patterns used by ultra-modern companies:

### **User Flow**

1. **Landing**: User visits signup page
2. **Primary Choice**: Social OAuth buttons (Google, Apple, GitHub) prominently displayed
3. **Secondary Option**: Magic link with email input
4. **Magic Link**: Instant authentication via email (no password needed)
5. **Success**: Seamless redirect to dashboard

### **Modern UX Features**

- **Passwordless First**: Magic links as the primary authentication method
- **Social Priority**: OAuth buttons above email input (following Slack, Notion patterns)
- **Progressive Disclosure**: Minimal fields, no overwhelming forms
- **Smart Validation**: Real-time email validation and work email detection
- **Trust Indicators**: Security badges, privacy messaging, "no spam" promises
- **Loading States**: Smooth animations and feedback for all actions

### **Technical Features**

- **Type Safety**: Full TypeScript support for all auth functions
- **Error Handling**: Comprehensive error states with user-friendly messages
- **Callback Handling**: Proper OAuth and magic link redirect management
- **Session Management**: Automatic session refresh and persistence
- **Provider Scopes**: Pre-configured scopes for future Gmail/Calendar integration

This implementation represents the cutting edge of user authentication UX, prioritizing user experience while maintaining security and functionality.

## Structured Content Architecture

The system now supports different types of structured content beyond just free-form memories:

### Content Types

- **memory**: Traditional free-form journal entries
- **milestone**: Life achievements with structured fields (category, impact, reflection)
- **yearly_overview**: Annual life reviews tracking multiple dimensions
- **goal**: Progress tracking with milestones and status updates
- **reflection**: Structured self-reflection entries
- **project**: Project tracking and documentation

### Benefits

1. **Unified Infrastructure**: All content types share the same underlying infrastructure (sharing, comments, search, AI analysis)
2. **Type Safety**: Full TypeScript support for each content type
3. **Extensible**: Easy to add new content types via the template system
4. **Structured Queries**: Can filter and analyze data by content type
5. **UI Flexibility**: Each content type can have custom UI components based on its schema

### Example Usage

```typescript
// Create a yearly overview
const yearlyOverview: CreateStructuredMemory<"yearly_overview"> = {
  content_type: "yearly_overview",
  body: {
    year: 2024,
    age: 30,
    work: "Senior Developer at TechCorp",
    relationships: "Married to Sarah",
    // ... other fields
  },
  // ... other memory fields
};

// Create a milestone
const milestone: CreateStructuredMemory<"milestone"> = {
  content_type: "milestone",
  body: {
    title: "Graduated from University",
    category: "education",
    achievement_date: "2023-05-15",
    impact_score: 9,
    // ... other fields
  },
  // ... other memory fields
};
```

This approach gives you the flexibility to have both free-form memories and highly structured data like your yearly overviews, all within the same system with full collaboration and AI features.
