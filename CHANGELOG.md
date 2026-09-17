# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-01-17

### Added
- Initial MVP release
- Next.js 14 with TypeScript and Tailwind CSS setup
- Main page with issue list and status filtering
- Issue detail page with comments section
- New issue creation form
- Reusable components (StatusBadge, PriorityBadge, CategoryIcon, IssueCard, Header)
- Mock data with 5 sample issues
- TypeScript types for issues, comments, and users
- Stats component showing issue counts
- Footer component with links
- Loading states for pages
- Custom 404 pages
- API routes structure for future backend
- Utility functions for formatting
- Search functionality across issues
- Sort options (newest, oldest, priority)
- SearchBar component
- Comprehensive documentation:
  - README with features and setup
  - CONTRIBUTING.md with guidelines
  - DEPLOYMENT.md with deployment options
  - SECURITY.md with security policy
- Docker support with Dockerfile
- GitHub Actions CI/CD workflows
- MIT License

### Features
- 📝 Issue tracking and management
- 🏷️ Categorization by type (plumbing, electrical, heating, etc.)
- ⚡ Priority levels (low, medium, high, urgent)
- 📊 Status tracking (pending, in progress, resolved, closed)
- 💬 Comment system for communication
- 🔍 Search and filter capabilities
- 📱 Responsive design for all devices
- 🎨 Modern UI with Tailwind CSS

## [Unreleased]

### Planned
- User authentication and authorization
- Real database integration
- Image upload for issues
- Email notifications
- Dashboard with analytics
- Mobile app
- Calendar for scheduling
- Invoice tracking
