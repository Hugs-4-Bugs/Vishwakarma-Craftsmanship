
# Vishwakarma 3D Showroom

Welcome to the Vishwakarma 3D Showroom, a modern, feature-rich e-commerce platform for high-quality, customizable furniture. This application is built from the ground up using a cutting-edge tech stack to provide a seamless, interactive, and visually stunning user experience.

## Key Features

- **Dynamic Homepage**: Features an infinitely scrolling marquee of products and sections for featured items, categories, and our AI-powered Style Quiz.
- **Full Product Catalog**: Browse products, filter by category, price, materials, and color on the shop page.
- **Detailed Product Pages**: View product details, image galleries, and related items.
- **AI-Powered Style Quiz**: A multi-step quiz that uses generative AI to analyze user preferences and provide personalized style profiles and furniture recommendations.
- **Custom Furniture Builder**: An interactive tool that allows users to create custom furniture by selecting types, materials, and finishes, with a real-time price estimate.
- **Carpenter Marketplace**: A dedicated section to find, filter, and book professional carpenters based on specialty, experience, and rating.
- **Secure User Authentication**: A complete, role-based authentication system with OTP verification for both customers and admins.
- **User Profiles**: Logged-in users can view their profile information.
- **Responsive Design**: A beautiful and consistent UI across all devices, from mobile phones to desktops.
- **Theming**: Supports both light and dark modes.

## Tech Stack

This project is built with a modern, type-safe, and performant technology stack:

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/) - A collection of beautifully designed, accessible, and customizable components.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
- **Animation**: [Framer Motion](https://www.framer.com/motion/) - For fluid animations and interactive UI elements.
- **Generative AI**: [Google's Genkit](https://firebase.google.com/docs/genkit) - Powers the AI Style Quiz and other generative features.
- **Icons**: [Lucide React](https://lucide.dev/) - A beautiful and consistent icon set.

## Project Structure

The project follows a standard Next.js App Router structure. Key directories are outlined below:

```
/
├── public/                 # Static assets
├── src/
│   ├── app/                # Main application folder (App Router)
│   │   ├── (main)/         # Main layout group for pages with header/footer
│   │   │   ├── about/
│   │   │   ├── blog/
│   │   │   ├── carpenters/
│   │   │   ├── contact/
│   │   │   ├── custom-builder/
│   │   │   ├── profile/
│   │   │   ├── shop/
│   │   │   ├── style-quiz/
│   │   │   ├── layout.tsx    # Main layout with header and footer
│   │   │   └── page.tsx      # Homepage
│   │   ├── auth/           # Auth layout group for login/signup
│   │   │   ├── forgot-password/
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── globals.css     # Global styles and ShadCN theme variables
│   │   └── layout.tsx      # Root layout of the application
│   ├── ai/                 # Genkit AI flows and configuration
│   │   ├── flows/          # AI logic for features like the style quiz
│   │   └── genkit.ts       # Genkit initialization
│   ├── components/         # Reusable React components
│   │   ├── icons/
│   │   ├── layout/         # Header, Footer, etc.
│   │   ├── shared/         # Cards, Modals, etc. shared across pages
│   │   └── ui/             # ShadCN UI components (Button, Card, etc.)
│   ├── hooks/              # Custom React hooks (e.g., use-toast)
│   └── lib/                # Library files, utilities, and data
│       ├── data.ts         # Static data for products, carpenters, etc.
│       ├── placeholder-images.ts # Image data
│       ├── types.ts        # TypeScript type definitions
│       └── utils.ts        # Utility functions (e.g., cn for classnames)
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/your-project.git
   ```
2. Install NPM packages:
   ```sh
   npm install
   ```

### Running the Development Server

To start the development server, run:

```sh
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.
