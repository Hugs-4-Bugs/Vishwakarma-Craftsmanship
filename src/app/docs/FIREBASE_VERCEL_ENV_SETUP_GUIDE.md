
# Environment Variable and Setup Guide

This guide explains how to set up environment variables for both local development and production deployment on Vercel, ensuring your frontend can communicate securely with Firebase services and your future Java backend.

## 1. Environment Variables

Environment variables are used to store sensitive information like API keys and backend URLs without hardcoding them into your source code.

Your Next.js application uses a `.env.local` file for local development. **This file should not be committed to Git.**

### Key Variables You Will Need

```
# .env.local

# 1. Java Backend API URL
# The base URL for your Spring Boot backend.
# The frontend will use this to make all API calls.
NEXT_PUBLIC_API_URL=http://localhost:8080

# 2. Firebase Project Configuration (Handled by Genkit)
# Your Genkit setup uses Google Application Default Credentials.
# For local development, this is typically configured by running `gcloud auth application-default login`.
# For Vercel, you will set the service account JSON directly.
# You DO NOT need to put the full firebaseConfig object here.
# Just the API key is needed for Genkit.
GEMINI_API_KEY=your_google_ai_studio_api_key_here

# 3. Payment Gateway Keys
# Public key for your payment provider (e.g., Stripe, Razorpay).
# The SECRET key should ONLY be on your Java backend, never on the frontend.
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

---

## 2. Local Development Setup

### 2.1. Connecting to Java Backend

1.  **Run your Java Backend**: Make sure your Spring Boot application is running, typically on `localhost:8080`.
2.  **Set Environment Variable**: Create a file named `.env.local` in the root of your Next.js project.
3.  **Add API URL**: Add `NEXT_PUBLIC_API_URL=http://localhost:8080` to `.env.local`.
4.  **Run Frontend**: Start the Next.js development server (`npm run dev`). The frontend can now make API calls to your local backend.

### 2.2. Connecting to Firebase (Genkit)

Genkit requires authentication to communicate with Google's AI services.

1.  **Install Google Cloud CLI**: If you haven't already, [install the gcloud CLI](https://cloud.google.com/sdk/docs/install).
2.  **Login**: Run the following command in your terminal and follow the prompts to log in with your Google account:
    ```sh
    gcloud auth application-default login
    ```
3.  **Set API Key**: Add your `GEMINI_API_KEY` to the `.env` file (note: not `.env.local`, as Genkit scripts might use it directly).
4.  **Run Genkit**: You can now run the Genkit development server (`npm run genkit:dev`) and the Next.js app (`npm run dev`) simultaneously.

---

## 3. Production Deployment Setup (Vercel)

When you deploy to Vercel, you need to configure the environment variables directly in the Vercel dashboard.

1.  **Login to Vercel**: Go to your project's dashboard on Vercel.
2.  **Navigate to Settings**: Go to `Settings` > `Environment Variables`.
3.  **Add Variables**: Add the following variables:

    | Name                              | Value                                                                                                                                                                                                                                                                      | Type     |
    |-----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
    | `NEXT_PUBLIC_API_URL`             | `https://your-java-backend-api.com` (The public URL of your deployed Java backend).                                                                                                                                                                                          | `Plaintext`|
    | `GEMINI_API_KEY`                  | Your actual Google AI Studio API Key.                                                                                                                                                                                                                                        | `Secret`   |
    | `GOOGLE_APPLICATION_CREDENTIALS`  | **(Most Secure)** Paste the entire content of your Firebase/Google Cloud service account JSON file here. This is the recommended way to authenticate services on Vercel. You can create a service account in the Google Cloud Console under "IAM & Admin" > "Service Accounts". | `Secret`   |
    | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Your public Stripe key.                                                                                                                                                                                                                                                  | `Plaintext`|

### Why `GOOGLE_APPLICATION_CREDENTIALS`?

Using a service account JSON file is more secure than a simple API key for server-to-server communication, which is what Genkit does. Vercel will automatically make this variable available to your serverless functions, and Genkit will use it to authenticate your AI requests securely. This avoids exposing any long-lived keys directly in your code.
