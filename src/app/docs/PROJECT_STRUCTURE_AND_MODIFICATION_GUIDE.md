
# Frontend Modification Guide

This document serves as a guide to understanding the Next.js frontend project structure and provides instructions on where to make changes for specific sections of the application.

## 1. Project Structure Overview

The project uses the Next.js App Router, which is organized around folders and special files like `page.tsx` and `layout.tsx`.

```
/src
├── app/                # Main application folder
│   ├── (main)/         # Layout group for pages with the main header/footer
│   │   ├── about/      # About Us page
│   │   ├── blog/       # Blog page
│   │   ├── carpenters/ # Carpenter marketplace page
│   │   ├── contact/    # Contact page
│   │   ├── custom-builder/ # Custom Furniture Builder page
│   │   ├── profile/    # User profile page
│   │   ├── shop/       # Product listing and detail pages
│   │   ├── style-quiz/ # AI Style Quiz page
│   │   ├── layout.tsx  # Main layout (Header, Footer)
│   │   └── page.tsx    # Homepage
│   ├── auth/           # Layout group for authentication pages
│   │   ├── login/      # Login page
│   │   └── signup/     # Signup page
│   ├── docs/           # Project documentation files
│   ├── globals.css     # Global styles and Tailwind/ShadCN theme
│   └── layout.tsx      # Root layout of the application
├── ai/                 # Genkit AI flows
│   └── flows/
├── components/         # Reusable React components
│   ├── icons/          # Custom SVG icons (e.g., Logo)
│   ├── layout/         # Header, Footer, UserNav
│   ├── shared/         # Components used across multiple pages (ProductCard, etc.)
│   └── ui/             # ShadCN UI components (Button, Card, etc.)
├── hooks/              # Custom React hooks (e.g., useToast)
└── lib/                # Library files, utilities, and static data
    ├── data.ts         # Mock data (to be replaced by API calls)
    ├── types.ts        # TypeScript type definitions
    └── utils.ts        # Utility functions
```

---

## 2. Where to Make Changes

This section maps frontend features to the files you need to edit.

| Feature / Section to Modify               | Primary File(s) to Edit                                                                                                                                                                                                                               | Description                                                                                                                                                             |
|-------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Homepage**                              | `src/app/(main)/page.tsx`                                                                                                                                                                                                                             | Contains all sections of the homepage: Hero, Featured Products, Categories, etc. Edit this file to change the homepage layout or content.                               |
| **Header / Navigation Bar**               | `src/components/layout/header.tsx`                                                                                                                                                                                                                    | Controls the main navigation bar, including links, logo, and the user authentication state (Login/Sign Up vs. User Profile).                                            |
| **Footer**                                | `src/components/layout/footer.tsx`                                                                                                                                                                                                                    | Contains all footer content, including links, newsletter signup, and social media icons.                                                                              |
| **Shop / Product Listing Page**           | `src/app/(main)/shop/page.tsx`                                                                                                                                                                                                                        | Displays the grid of all products and includes the filtering sidebar logic. This is where you would replace mock data with an API call to fetch all products.          |
| **Product Detail Page**                   | `src/app/(main)/shop/[slug]/page.tsx`                                                                                                                                                                                                                 | The template for displaying a single product's details, including its image gallery, description, price, and related products.                                        |
| **Authentication (Login/Signup)**         | `src/app/auth/login/page.tsx`<br/>`src/app/auth/signup/page.tsx`                                                                                                                                                                                      | These files contain the forms and logic for user login and registration. This is where you would implement API calls to your backend's `/api/auth` endpoints.         |
| **User Profile Page**                     | `src/app/(main)/profile/page.tsx`                                                                                                                                                                                                                     | The page where a logged-in user can view and edit their information.                                                                                                    |
| **Carpenter Marketplace**                 | `src/app/(main)/carpenters/page.tsx`<br/>`src/components/shared/carpenter-card.tsx`<br/>`src/components/shared/booking-modal.tsx`                                                                                                                        | The main page for finding carpenters, the reusable card for displaying each carpenter, and the modal for booking them.                                                  |
| **AI Style Quiz**                         | `src/app/(main)/style-quiz/page.tsx`<br/>`src/ai/flows/style-quiz.flow.ts`                                                                                                                                                                              | The UI for the quiz is in the `page.tsx` file. The AI logic that processes the answers and generates recommendations is in the Genkit flow file.                      |
| **Custom Furniture Builder**              | `src/app/(main)/custom-builder/page.tsx`                                                                                                                                                                                                              | Contains the UI and logic for the interactive furniture builder, including the real-time price estimation.                                                            |
| **Styling and Theme (Colors, Fonts)**     | `src/app/globals.css`<br/>`tailwind.config.ts`                                                                                                                                                                                                         | `globals.css` contains the HSL color variables for the ShadCN theme (light and dark modes). `tailwind.config.ts` defines the project's fonts and other Tailwind extensions. |
| **Static Data (to be replaced)**          | `src/lib/data.ts`<br/>`src/lib/placeholder-images.json`                                                                                                                                                                                                | These files contain all the mock data for products, carpenters, etc. As you build your backend, you will replace the logic that uses this data with API calls.            |
| **TypeScript Types**                      | `src/lib/types.ts`                                                                                                                                                                                                                                    | Contains all shared TypeScript types used across the application (e.g., `Product`, `Carpenter`). Keep this in sync with your backend DTOs.                               |
