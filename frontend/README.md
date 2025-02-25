# Blognet - Personal Blogging Platform

A modern, responsive web application enabling users to create, manage, and explore blog posts in a user-friendly environment.

## Features

- User authentication
  - Secure signup and login
  - Password reset functionality
  - Profile management
- Blog Management
  - Create, edit, and delete personal blog posts
  - Rich text editor with markdown support
  - Image upload capabilities
  - Draft saving functionality
- Social Features
  - Follow other bloggers
  - Like and comment on posts
  - Share posts on social media
- Responsive Design
  - Mobile-first approach
  - Optimized for tablets and desktop
  - Dark/Light theme support

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blognet.git
   cd blognet/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- React 18 with TypeScript
- Vite for fast development
- State Management: Redux Toolkit
- Styling: Tailwind CSS
- Form Handling: React Hook Form
- API Client: Axios
- Testing: Vitest + React Testing Library
- Code Quality:
  - ESLint
  - Prettier
  - Husky for pre-commit hooks

## Project Structure

```
frontend/
├── src/
│   ├── components/    # Reusable UI components
│   │   ├── common/   # Shared components
│   │   ├── layout/   # Layout components
│   │   └── forms/    # Form components
│   ├── pages/        # Main page components
│   ├── services/     # API integration
│   ├── store/        # Redux store setup
│   ├── hooks/        # Custom React hooks
│   ├── utils/        # Helper functions
│   ├── types/        # TypeScript definitions
│   └── assets/       # Static resources
├── public/           # Public assets
└── tests/            # Test files
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Check code quality
- `npm run format` - Format code