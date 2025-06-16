# Research Review Platform

A professional academic research review publishing platform built with Next.js, featuring advanced search capabilities, SEO optimization, and database-driven content management.

## Features

- **Next.js Framework**: Server-side rendering and static generation for optimal SEO
- **Advanced Search**: Fuzzy search with Fuse.js, filtering by domain, year, tags, and reading time
- **Database Integration**: PostgreSQL with Drizzle ORM for robust data management
- **Modern UI**: Tailwind CSS with shadcn/ui components for professional design
- **Content Management**: Markdown rendering with rehype-sanitize for safe content display
- **Export Functionality**: PDF and BibTeX citation export capabilities
- **Responsive Design**: Mobile-first approach with accessibility features
- **Version Tracking**: Review versioning with changelog support

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: PostgreSQL with Drizzle ORM
- **Search**: Fuse.js for client-side fuzzy search
- **Content**: react-markdown with rehype plugins
- **Development**: TypeScript, ESLint, PostCSS

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── header.tsx        # Site header
│   ├── footer.tsx        # Site footer
│   └── reviews-list.tsx  # Main reviews display
├── lib/                  # Utility libraries
├── server/               # Backend logic
│   ├── db.ts            # Database connection
│   ├── storage.ts       # Data access layer
│   └── routes.ts        # Express routes (legacy)
├── shared/               # Shared schemas and types
├── types/                # TypeScript definitions
└── middleware.ts         # Next.js middleware
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Extract the project files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   DATABASE_URL=your_postgresql_connection_string
   ```

4. Push database schema:
   ```bash
   npm run db:push
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## Database Setup

The platform uses PostgreSQL with Drizzle ORM. The database includes:

- **Reviews table**: Academic research reviews with metadata
- **Users table**: User authentication and roles
- **Full-text search**: Optimized search across review content

### Sample Data

The platform includes three sample academic reviews covering:
- Machine Learning (Transformer Architecture)
- Quantum Computing (Error Correction)
- Materials Science (Solid-State Batteries)

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema changes

### Architecture

The platform follows a modern Next.js architecture:

1. **API Routes**: Handle database operations and search
2. **Server Components**: Optimize performance with server-side rendering
3. **Client Components**: Interactive features with React hooks
4. **Middleware**: Route handling and API proxying

## Deployment

The platform is optimized for deployment on:

- **Vercel**: Native Next.js hosting with edge functions
- **Railway**: PostgreSQL database hosting
- **Supabase**: Alternative database and auth provider

### Production Considerations

- Configure environment variables
- Set up database connection pooling
- Enable Next.js analytics
- Configure custom domain and SSL

## Future Enhancements

### Authentication & Authorization
- Clerk.dev or Auth0 integration
- Role-based access control (admin, reviewer, public)
- OAuth with Google/GitHub

### Search & Performance
- Algolia or Typesense for large-scale search
- Redis caching layer
- CDN integration for static assets

### Content Management
- Admin dashboard for review management
- Submission workflows
- Review approval process

## License

MIT License - see LICENSE file for details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For questions or issues, please contact the development team or create an issue in the repository.