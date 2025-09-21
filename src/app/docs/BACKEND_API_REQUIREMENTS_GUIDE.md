
# Backend API Requirements Guide (Java Spring Boot)

This document outlines the complete API requirements and project structure for the **Vishwakarma 3D Showroom** backend, to be built with Java Spring Boot.

## 1. Recommended Project Structure

A standard Maven/Gradle project structure is recommended. This structure promotes separation of concerns and maintainability.

```
/src
├── main
│   ├── java
│   │   └── com
│   │       └── vishwakarma
│   │           ├── VishwakarmaApplication.java
│   │           ├── config          // Spring Security, CORS, etc.
│   │           ├── controller      // REST API controllers (endpoints)
│   │           ├── dto             // Data Transfer Objects (for API requests/responses)
│   │           ├── entity          // JPA entities (database models)
│   │           ├── exception       // Custom exception handlers
│   │           ├── repository      // Spring Data JPA repositories
│   │           └── service         // Business logic
│   └── resources
│       ├── application.properties  // Configuration for database, server port, etc.
│       ├── static                  // Static assets (if any)
│       └── templates               // Server-rendered templates (if any)
└── test
    └── java
        └── com
            └── vishwakarma
                └── ...             // Unit and integration tests
```

---

## 2. Core Dependencies

- **Spring Web**: For building REST APIs.
- **Spring Data JPA**: For database interaction.
- **Spring Security**: For authentication and authorization.
- **PostgreSQL/MySQL Driver**: Database-specific driver.
- **Lombok**: To reduce boilerplate code (getters, setters, etc.).
- **JWT Library (e.g., `jjwt`)**: For generating and validating JSON Web Tokens for auth.
- **Validation**: For validating request DTOs.
- **Stripe/Razorpay SDK**: For payment gateway integration.

---

## 3. API Endpoints

All endpoints should be prefixed with `/api`. Versioning (e.g., `/api/v1`) is recommended.

### 3.1. Authentication (`/api/auth`)

| Method | URL                      | Name                    | Description                                                                                               |
|--------|--------------------------|-------------------------|-----------------------------------------------------------------------------------------------------------|
| `POST` | `/api/auth/register`     | `registerUser`          | Registers a new user (customer, admin). Requires OTP verification logic before creating the user.         |
| `POST` | `/api/auth/login`        | `loginUser`             | Authenticates a user and returns a JWT token.                                                             |
| `POST` | `/api/auth/send-otp`     | `sendOtp`               | Sends an OTP to the user's email or phone. (Integrates with an email/SMS service).                        |
| `POST` | `/api/auth/verify-otp`   | `verifyOtp`             | Verifies the provided OTP. On success, marks email/phone as verified.                                     |

### 3.2. Products (`/api/products`)

| Method | URL                      | Name                    | Description                                                                                               |
|--------|--------------------------|-------------------------|-----------------------------------------------------------------------------------------------------------|
| `GET`  | `/api/products`          | `getAllProducts`        | Retrieves a list of all products. Supports filtering (category, price, material) and pagination.          |
| `GET`  | `/api/products/{id}`     | `getProductById`        | Retrieves details for a single product by its ID or slug.                                                 |
| `POST` | `/api/products`          | `createProduct`         | **(Admin)** Adds a new product to the catalog.                                                            |
| `PUT`  | `/api/products/{id}`     | `updateProduct`         | **(Admin)** Updates an existing product.                                                                  |
| `DELETE`| `/api/products/{id}`     | `deleteProduct`         | **(Admin)** Deletes a product.                                                                            |
| `GET`  | `/api/products/categories` | `getProductCategories`  | Retrieves a list of all product categories.                                                               |

### 3.3. Carpenters (`/api/carpenters`)

| Method | URL                      | Name                    | Description                                                                                               |
|--------|--------------------------|-------------------------|-----------------------------------------------------------------------------------------------------------|
| `GET`  | `/api/carpenters`        | `getAllCarpenters`      | Retrieves a list of all approved carpenters. Supports filtering (specialty, experience, rating).          |
| `GET`  | `/api/carpenters/{id}`   | `getCarpenterById`      | Retrieves the public profile of a single carpenter.                                                       |
| `POST` | `/api/carpenters/register` | `registerCarpenter`     | A carpenter signs up. This creates a profile with a "pending" status.                                   |
| `PUT`  | `/api/carpenters/approve/{id}` | `approveCarpenter`    | **(Admin)** Approves a carpenter's registration, making their profile public.                             |
| `PUT`  | `/api/carpenters/profile`| `updateCarpenterProfile`| **(Carpenter)** Allows a carpenter to update their own profile.                                             |

### 3.4. Bookings (`/api/bookings`)

| Method | URL                      | Name                    | Description                                                                                               |
|--------|--------------------------|-------------------------|-----------------------------------------------------------------------------------------------------------|
| `POST` | `/api/bookings`          | `createBooking`         | Creates a new booking for a carpenter. Requires customer authentication.                                  |
| `GET`  | `/api/bookings/my-bookings`| `getMyBookings`         | **(Customer/Carpenter)** Retrieves a list of bookings for the logged-in user.                             |
| `PUT`  | `/api/bookings/{id}/cancel`| `cancelBooking`         | **(Customer/Admin)** Cancels a booking.                                                                   |

### 3.5. Orders (`/api/orders`)

| Method | URL                      | Name                    | Description                                                                                               |
|--------|--------------------------|-------------------------|-----------------------------------------------------------------------------------------------------------|
| `POST` | `/api/orders`            | `createOrder`           | Creates an order from the user's cart. Returns an `orderId` for payment processing.                       |
| `GET`  | `/api/orders/my-orders`  | `getMyOrders`           | **(Customer)** Retrieves the order history for the logged-in user.                                        |
| `GET`  | `/api/orders`            | `getAllOrders`          | **(Admin)** Retrieves all orders for management.                                                          |
| `POST` | `/api/webhooks/payment`  | `handlePaymentWebhook`  | A webhook endpoint for the payment gateway to send payment status updates.                                |

---

## 4. Payment Gateway Integration (Example: Stripe)

1.  **Dependency**: Add the Stripe Java SDK.
2.  **Configuration**: Store your Stripe secret key securely in `application.properties` or environment variables.
3.  **Flow**:
    a.  When the user checks out, the backend creates an `Order` in the database with a `pending` status.
    b.  The backend then creates a Stripe `PaymentIntent` with the order amount and returns the `client_secret` from this intent to the frontend.
    c.  The frontend uses this `client_secret` to confirm the payment with Stripe.js.
    d.  Stripe sends a webhook event (e.g., `payment_intent.succeeded`) to your backend endpoint (`/api/webhooks/payment`).
    e.  Your webhook handler verifies the event, finds the corresponding order, and updates its status to `completed`.

---

## 5. Connecting Frontend to Backend

To connect the Next.js frontend to your Java backend, you will need to make changes in the frontend codebase.

### Step 1: Set Environment Variable

In the frontend project, create a `.env.local` file (if it doesn't exist) and add the base URL of your backend API.

**.env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```
*(Replace `http://localhost:8080` with your actual deployed backend URL in production).*

### Step 2: Modify Frontend Files to Call the API

Currently, the frontend uses mock data from `src/lib/data.ts`. You will need to replace this with API calls.

**Example: Fetching products in `src/app/(main)/shop/page.tsx`**

You would replace the static import of `products` with a `fetch` call inside a `useEffect` hook.

```jsx
// src/app/(main)/shop/page.tsx

'use client';

import { useState, useEffect } from 'react';
// import { products } from '@/lib/data'; // REMOVE THIS
import type { Product } from '@/lib/types';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Construct the URL with query params for filtering
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []); // Add dependencies for filters later

  // ... rest of the component uses the `products` state
}
```

This pattern of replacing static data with `fetch` calls needs to be applied across the application:
-   `src/app/(main)/carpenters/page.tsx` (for fetching carpenters)
-   `src/app/(main)/shop/[slug]/page.tsx` (for fetching a single product)
-   `src/app/auth/login/page.tsx` (for calling the login endpoint)
-   `src/app/auth/signup/page.tsx` (for calling the register endpoint)
-   And so on for any component that currently relies on `src/lib/data.ts`.
