# Immoben

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

Portail de suivi des pannes locatives (MVP) - A rental breakdown tracking portal for managing and tracking maintenance issues.

## Features

- 📝 **Issue Tracking**: Create and track maintenance issues with detailed descriptions
- 🏷️ **Categorization**: Organize issues by category (plumbing, electrical, heating, appliances, structure, security)
- ⚡ **Priority Levels**: Set priority levels (low, medium, high, urgent) for each issue
- 📊 **Status Management**: Track issue status (pending, in progress, resolved, closed)
- 💬 **Comments**: Communication between tenants and landlords through comments
- 🔍 **Filtering**: Filter issues by status for better organization
- 🎨 **Modern UI**: Beautiful and responsive interface built with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/PJ-Fuentes/Immoben.git
cd Immoben
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
/
├── app/                    # Next.js app directory
│   ├── issue/[id]/        # Issue detail page
│   ├── new/               # New issue creation page
│   ├── page.tsx           # Home page with issue list
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── CategoryIcon.tsx
│   ├── Header.tsx
│   ├── IssueCard.tsx
│   ├── PriorityBadge.tsx
│   └── StatusBadge.tsx
├── lib/                   # Utility functions and data
│   └── mockData.ts        # Mock data for development
├── types/                 # TypeScript type definitions
│   └── index.ts
└── public/               # Static assets
```

## Usage

### Viewing Issues

The home page displays all maintenance issues with the ability to filter by status. Each issue card shows:
- Title and description
- Category icon
- Priority and status badges
- Tenant name and property address
- Creation date and number of comments

### Creating a New Issue

1. Click "Signaler une panne" in the header
2. Fill in the form with:
   - Your name
   - Property address
   - Issue title
   - Detailed description
   - Category
   - Priority level
3. Submit the form

### Issue Details

Click on any issue card to view full details including:
- Complete description
- All comments and conversation history
- Creation and update timestamps
- Ability to add new comments

## Future Enhancements

- User authentication and authorization
- Real-time notifications
- Image upload for issue documentation
- Email notifications
- Dashboard with analytics
- Mobile app
- Integration with property management systems
- Calendar for scheduling repairs
- Invoice tracking

## Documentation

- [Contributing Guidelines](CONTRIBUTING.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Security Policy](SECURITY.md)
- [Changelog](CHANGELOG.md)

## CI/CD

This project includes GitHub Actions workflows for:
- Continuous Integration (lint and build)
- Docker image building and publishing

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)

## Support

If you like this project, please consider giving it a ⭐ on GitHub!
