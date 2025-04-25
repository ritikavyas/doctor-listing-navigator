# Doctor Listing Navigator

A modern web application for browsing, searching, and filtering through a directory of doctors.

![Doctor Listing Navigator](public/screenshot.png)

### Deploy Link:
https://doctornavigator.netlify.app/

## Features

- **Doctor Listings**: Browse a comprehensive list of doctors with detailed information
- **Advanced Filtering**:
  - Search doctors by name
  - Filter by medical specialties (multiple selection)
  - Filter by consultation type (Video Consult/In Clinic)
  - Sort by consultation fees (low to high) or experience (high to low)
- **URL-Based Filtering**: All filters are stored in URL parameters for easy sharing and bookmarking
- **Responsive Design**: Optimized for all device sizes
- **Modern UI**: Clean, accessible interface built with shadcn/ui components

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (built on Radix UI primitives)
- **State Management**: React Query for data fetching
- **Form Handling**: React Hook Form with Zod validation
- **Development Tools**: Lovable Tagger for automated code tagging

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── DoctorCard.tsx  # Individual doctor card component
│   ├── DoctorList.tsx  # List of doctor cards
│   ├── FilterPanel.tsx # Filtering sidebar component
│   ├── SearchHeader.tsx # Top search and navigation bar
│   └── ui/             # shadcn/ui component library
├── hooks/              
│   ├── useDoctorFiltering.ts # Custom hook for filtering logic
│   ├── use-mobile.tsx        # Hook for responsive design
│   └── use-toast.ts          # Toast notification hook
├── lib/                # Utility functions
├── pages/              # Page components
│   ├── Index.tsx       # Main listing page
│   └── NotFound.tsx    # 404 page
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd doctor-listing-navigator
```

2. Install dependencies:
```sh
npm install
# or
yarn install
```

3. Start the development server:
```sh
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## API Integration

The application fetches doctor data from a mock API endpoint: 
```
https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json
```

The `useDoctorFiltering` hook handles:
- Data fetching and transformation
- Search functionality
- Filtering logic
- URL parameter synchronization

## Deployment

### Building for Production

```sh
npm run build
# or
yarn build
```

### Using Lovable

You can deploy this project directly through [Lovable](https://lovable.dev/projects/00391bc8-f79f-457c-8784-69ab1b2d3d5c):

1. Navigate to your project in Lovable
2. Click on Share -> Publish
3. Follow the deployment instructions

### Custom Domain Setup

To connect a custom domain to your Lovable project:
1. Navigate to Project > Settings > Domains
2. Click Connect Domain
3. Follow the instructions in the [Lovable documentation](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Development with Lovable

This project is integrated with [Lovable](https://lovable.dev), a platform for AI-assisted development:

- **Lovable Tagger**: Automatically tags and organizes code for better AI understanding
- **Collaborative Editing**: Make changes through the Lovable platform or locally
- **Version Control**: All changes are committed to the repository

To use Lovable for development:
1. Visit the [Lovable Project](https://lovable.dev/projects/00391bc8-f79f-457c-8784-69ab1b2d3d5c)
2. Start prompting to make changes to the codebase
3. Changes will be automatically committed to the repository

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
# doctor-listing-navigator
