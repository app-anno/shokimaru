# Project Context for Claude Code

## やりとりは日本語でしてください

## Ultrathink Mode
When working on complex problems in this project, use extended thinking to:
- Deeply analyze requirements before implementation
- Consider multiple approaches and their trade-offs
- Think through edge cases and potential issues
- Plan comprehensive solutions before coding

---

## Project Overview

**翔葵丸 (Shokimaru) - Fishing Boat Website**

This is a web application for a squid fishing boat business operating in Hagi Bay, Yamaguchi Prefecture, Japan. The site serves as both a marketing platform and management system for fishing experiences.

### Key Information
- **Boat Name**: 翔葵丸 (Shokimaru)
- **Capacity**: Maximum 6 people
- **Location**: Hagi Bay, Yamaguchi Prefecture
- **Service**: Squid fishing experiences
- **Target Audience**: Beginners and women interested in fishing
- **Business Model**:
  - Shared boat: ¥9,000 per person
  - Charter: ¥45,000 per boat (max 6 people)
  - Rod rental: ¥1,000 per set

### Project Goals
- Attract beginner-friendly fishing customers
- Showcase recent fishing results to build trust
- Provide easy booking contact methods
- Manage fishing results efficiently via admin panel

---

## Quick Start

### Prerequisites
- Node.js 20+
- npm or pnpm
- Supabase account (for database and storage)
- Vercel account (for deployment)

### Setup Steps

```bash
# 1. Navigate to the web directory
cd shokimaru-web

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# 4. Run development server
npm run dev

# 5. Open browser
# Visit http://localhost:3000
```

### Environment Variables Required
```env
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
ADMIN_PASSWORD=<admin-panel-password>
```

---

## Tech Stack

### Frontend
- **Next.js 14.2.3** - React framework with App Router
  - React Server Components enabled
  - Automatic code splitting
  - Built-in image optimization
- **React 18** - UI library
- **TypeScript 5** - Type-safe JavaScript (strict mode enabled)
- **Tailwind CSS 3.4.1** - Utility-first CSS framework

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Storage for images
  - Row Level Security (RLS)
- **@supabase/supabase-js 2.50.0** - Supabase JavaScript client
- **@supabase/ssr 0.6.1** - SSR support for Supabase

### Hosting & Analytics
- **Vercel** - Hosting platform (Tokyo region: hnd1)
- **@vercel/analytics 1.5.0** - Web analytics
- **@vercel/speed-insights 1.2.0** - Performance monitoring

### Development Tools
- **ESLint 8** - Code linting
- **Prettier** - Code formatting
- **TypeScript Compiler** - Type checking

---

## Project Structure

```
shokimaru-web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Homepage with hero section
│   │   ├── layout.tsx         # Root layout with metadata
│   │   ├── globals.css        # Global styles and Tailwind
│   │   ├── admin/             # Admin panel (basic auth protected)
│   │   │   ├── page.tsx       # Admin dashboard
│   │   │   └── results/       # Fishing results management
│   │   ├── api/               # API routes
│   │   │   └── ...            # Backend endpoints
│   │   ├── results/           # Public fishing results page
│   │   ├── guide/             # Beginner's guide page
│   │   ├── pricing/           # Pricing information
│   │   ├── access/            # Access & location info
│   │   ├── sightseeing/       # Local sightseeing guide
│   │   ├── faq/               # Frequently asked questions
│   │   ├── contact/           # Contact information
│   │   ├── privacy/           # Privacy policy
│   │   ├── sitemap.ts         # Dynamic sitemap generation
│   │   ├── robots.ts          # Robots.txt configuration
│   │   └── not-found.tsx      # 404 error page
│   ├── components/            # Reusable React components
│   │   ├── admin/             # Admin-specific components
│   │   ├── Header.tsx         # Site navigation header
│   │   ├── Footer.tsx         # Site footer
│   │   ├── MobileBottomBar.tsx # Fixed mobile CTA bar
│   │   ├── AnimatedSection.tsx # Scroll animations
│   │   ├── AnimatedBackground.tsx # Background effects
│   │   ├── MoonPhase.tsx      # Moon phase display
│   │   ├── ImageCarousel.tsx  # Photo carousel
│   │   └── ...                # Other UI components
│   ├── lib/                   # Utility functions
│   │   ├── supabase/          # Supabase client configuration
│   │   │   ├── client.ts      # Client-side Supabase
│   │   │   └── server.ts      # Server-side Supabase
│   │   ├── constants/         # App-wide constants
│   │   └── hooks/             # Custom React hooks
│   ├── types/                 # TypeScript type definitions
│   │   └── database.types.ts  # Supabase generated types
│   └── middleware.ts          # Next.js middleware (auth, etc.)
├── public/                    # Static assets (images, icons)
├── docs/                      # Project documentation
│   └── SUPABASE_SETUP.md     # Supabase configuration guide
├── scripts/                   # Utility scripts
│   └── setup-env.js          # Environment setup script
├── supabase/                  # Supabase configuration
│   └── migrations/           # Database migration files
├── next.config.mjs           # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── vercel.json               # Vercel deployment config
└── package.json              # Project dependencies

Root documentation:
├── requirements.md            # Project requirements definition
├── tech-stack.md             # Technical architecture details
├── development-tickets.md    # Development task tracking
├── sitemap.md                # Site structure planning
└── CLAUDE.md                 # This file
```

---

## Database Schema

### Tables

#### fishing_results
Stores information about fishing trips and catches.

```sql
CREATE TABLE fishing_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  weather VARCHAR(50),           -- Weather conditions (e.g., "晴れ", "曇り")
  catch_count INTEGER NOT NULL,  -- Number of squid caught
  size VARCHAR(100),             -- Size information (e.g., "大サイズ中心")
  image_url TEXT,                -- URL to result image in storage
  is_public BOOLEAN DEFAULT true, -- Visibility on public site
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Storage Buckets

#### result-images
- **Purpose**: Store fishing result photos
- **Access**: Public read, admin write
- **File types**: JPEG, PNG, WebP
- **Max size**: 5MB per file

---

## Key Components

### Layout Components
- **Header.tsx** - Site navigation with responsive menu
- **Footer.tsx** - Footer with links and contact info
- **MobileBottomBar.tsx** - Fixed bottom bar with booking/call CTAs
- **Layout.tsx** - Overall page layout wrapper

### Animation Components
- **AnimatedSection.tsx** - Scroll-triggered fade-in animations
- **AnimatedBackground.tsx** - Animated background gradients
- **AnimatedButton.tsx** - Interactive button animations
- **FloatingElements.tsx** - Floating decorative elements
- **WaveAnimation.tsx** - Ocean wave visual effects
- **SquidAnimation.tsx** - Squid-themed animations
- **ParallaxSection.tsx** - Parallax scrolling effects

### UI Components
- **Button.tsx** - Primary button component
- **Card.tsx** - Card container with consistent styling
- **LoadingButton.tsx** - Button with loading state
- **LoadingSpinner.tsx** - Loading indicator
- **Toast.tsx** - Toast notification system
- **OptimizedImage.tsx** - Image component with optimization

### Feature Components
- **MoonPhase.tsx** - Displays current moon phase (important for fishing)
- **ImageCarousel.tsx** - Image carousel for fishing result photos
- **StructuredData.tsx** - JSON-LD structured data for SEO
- **GoogleTagManager.tsx** - Google Tag Manager integration
- **GoogleAnalytics.tsx** - Google Analytics 4 integration

### Admin Components (src/components/admin/)
Components specific to the admin panel for managing fishing results.

---

## Page Routes

### Public Pages
- **/** - Homepage with hero, services, and latest results
- **/results** - Browse all fishing results with filtering
- **/guide** - Beginner's guide to squid fishing
- **/pricing** - Pricing plans and rental information
- **/access** - Location, map, and access directions
- **/sightseeing** - Local sightseeing recommendations
- **/faq** - Frequently asked questions
- **/contact** - Contact methods (LINE, Instagram, phone)
- **/privacy** - Privacy policy

### Admin Pages (Basic Auth Protected)
- **/admin** - Admin dashboard
- **/admin/results** - Manage fishing results (CRUD operations)

### API Routes
- **/api/*** - Server-side API endpoints for data operations

---

## Development Workflow

### Adding a New Page

1. Create page directory in `src/app/[page-name]/`
2. Add `page.tsx` with page component
3. Add metadata export for SEO:
   ```tsx
   export const metadata: Metadata = {
     title: "Page Title | 翔葵丸",
     description: "Page description",
   };
   ```
4. Test mobile responsiveness
5. Add to sitemap if needed

### Working with Supabase

**Database Changes:**
```bash
# Create a new migration
npx supabase migration new migration_name

# Apply migrations locally
npx supabase db push

# Generate TypeScript types
npx supabase gen types typescript --local > src/types/database.types.ts
```

**Using Supabase Client:**
```tsx
// Client component
import { createClientComponentClient } from '@/lib/supabase/client'

const supabase = createClientComponentClient()
const { data, error } = await supabase
  .from('fishing_results')
  .select('*')
```

```tsx
// Server component
import { createServerComponentClient } from '@/lib/supabase/server'

const supabase = createServerComponentClient()
const { data, error } = await supabase
  .from('fishing_results')
  .select('*')
```

### Adding a Component

1. Create component file in `src/components/[ComponentName].tsx`
2. Follow TypeScript conventions with proper types
3. Use Tailwind CSS for styling
4. Export component as default or named export
5. Add to relevant pages

### Running Tests & Checks

```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Build check
npm run build

# Development server
npm run dev
```

---

## Coding Conventions

### TypeScript
- **Strict mode enabled** - All TypeScript strict checks are on
- **No implicit any** - Always specify types explicitly
- **Type definitions** - Store shared types in `src/types/`
- **Path aliases** - Use `@/*` for imports (e.g., `import { Button } from '@/components/Button'`)

### React & Next.js
- **Server Components by default** - Use RSC unless interactivity needed
- **Client Components** - Add `'use client'` directive only when necessary
- **Async/await** - Use for data fetching in Server Components
- **Error boundaries** - Implement error.tsx for error handling
- **Loading states** - Implement loading.tsx for loading states

### Styling
- **Tailwind CSS only** - No custom CSS except in globals.css
- **Color theme** - Use predefined colors from tailwind.config.ts:
  - Primary: `#4a8db5` (calm blue-green)
  - Secondary: `#64acc8` (bright blue-green)
  - Accent: `#ff8c42` (sunset orange)
  - Ocean: `#2e5f7a` (deep sea blue)
- **Mobile-first** - Design for mobile, then add breakpoints
- **Responsive design** - Test on all screen sizes

### File Naming
- **Components**: PascalCase (e.g., `Button.tsx`, `MoonPhase.tsx`)
- **Utilities**: kebab-case (e.g., `date-utils.ts`)
- **Routes**: Next.js conventions (`page.tsx`, `layout.tsx`, `route.ts`)

### Code Organization
- **Small components** - Keep components focused and single-purpose
- **Custom hooks** - Extract reusable logic to `lib/hooks/`
- **Constants** - Store in `lib/constants/`
- **Utility functions** - Place in `lib/` with appropriate names

---

## Common Tasks

### Updating Fishing Results
1. Access admin panel at `/admin`
2. Enter admin password (from ADMIN_PASSWORD env var)
3. Navigate to Results management
4. Add/edit/delete fishing results
5. Upload photos (max 5MB)
6. Toggle public visibility

### Managing Environment Variables

**Local Development:**
- Edit `.env.local` file
- Restart dev server after changes

**Production (Vercel):**
- Go to Vercel dashboard → Project Settings → Environment Variables
- Add/update variables
- Redeploy to apply changes

### Deploying to Production

The project auto-deploys via Vercel:
1. Push to main branch on GitHub
2. Vercel automatically builds and deploys
3. Check deployment logs in Vercel dashboard
4. Verify deployment at production URL

**Manual deployment:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## Design Theme

### Color Palette
```css
/* Primary colors */
--primary: #4a8db5;      /* Calm blue-green - main brand color */
--secondary: #64acc8;    /* Bright blue-green - secondary accent */
--accent: #ff8c42;       /* Sunset orange - call-to-action */
--ocean: #2e5f7a;        /* Deep sea blue - darker sections */

/* Neutral colors */
--background: #f8fafb;   /* Light gray - page background */
--text: #1e2936;         /* Dark gray - body text */
```

### Design Principles
- **Ocean-inspired** - Blues and greens evoke the sea
- **Beginner-friendly** - Clean, approachable design
- **Mobile-optimized** - Most users browse on phones
- **Photo-centric** - Fishing results showcase catches

---

## Important Notes

### Language
- **All user-facing content must be in Japanese**
- Use natural, beginner-friendly Japanese
- Avoid overly technical fishing terms

### Target Audience
- Prioritize beginners and women
- Make content welcoming and non-intimidating
- Include helpful tips and guidance

### SEO Considerations
- Each page has proper metadata
- Structured data for local business
- Sitemap and robots.txt configured
- Image optimization enabled

### Mobile Responsiveness
- Fixed bottom bar on mobile for easy booking
- Touch-friendly button sizes
- Optimized images for mobile bandwidth
- Responsive navigation menu

---

## Related Documentation

For more detailed information, see:
- **requirements.md** - Complete project requirements
- **tech-stack.md** - Technical architecture and decisions
- **development-tickets.md** - Current development tasks
- **sitemap.md** - Site structure and page planning
- **docs/SUPABASE_SETUP.md** - Supabase configuration guide

---

## Development Commands Reference

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
npm run setup           # Setup environment variables

# Type checking
npx tsc --noEmit        # Check TypeScript types without emitting files

# Supabase (if using local Supabase)
npx supabase start      # Start local Supabase
npx supabase stop       # Stop local Supabase
npx supabase migration new <name>  # Create new migration
npx supabase db push    # Apply migrations
npx supabase gen types typescript  # Generate types

# Vercel CLI
vercel dev              # Run Vercel dev environment locally
vercel --prod           # Deploy to production
```

---

## Troubleshooting

### Common Issues

**"Supabase client error"**
- Check environment variables are set correctly
- Verify Supabase URL and keys in .env.local
- Ensure Supabase project is active

**"Image not loading"**
- Check image URL in Supabase storage
- Verify storage bucket permissions (public read)
- Ensure image size is under 5MB

**"Admin panel password not working"**
- Verify ADMIN_PASSWORD env var is set
- Clear browser cookies/cache
- Check middleware.ts authentication logic

**"Build fails on Vercel"**
- Check build logs in Vercel dashboard
- Verify all environment variables are set in Vercel
- Run `npm run build` locally to reproduce

**"TypeScript errors"**
- Run `npx tsc --noEmit` to see all errors
- Check type definitions in src/types/
- Ensure all imports are correct

---

## Version History

- **v0.1.0** (2025-01-04) - Initial release with core features
  - Public website with fishing results
  - Admin panel for result management
  - Mobile-responsive design
  - Supabase integration
  - Vercel deployment

---

**Last Updated:** 2025-01-04
