# BROCCOLI & CO. LANDIN PAGE

## Overview

This is a simple single-page web application for Broccoli & Co., an upcoming online service company. The application allows users to request an invitation by entering their Full name, Email, and Confirm email.

## Features

- A clean and responsive homepage with a fixed header and footer.
- A centered section containing a heading, description, and a "Request an Invite" button.
- A popup form for users to enter their details.
- Form validation to ensure correct input before submitting.
- API integration to submit the request along with abort controllers
- Error handling for invalid responses from the backend.

## Tech Stack

This project is built using modern web technologies:

- Next.js - A React framework that enhances SEO, making it ideal for landing pages.
- React - Component-based front-end library for building interactive UIs.
- Styled Components - Enables CSS-in-JS for scoped and dynamic styling.
- React Hook Form - Lightweight and efficient form validation with built-in support for React components.
- Axios - Simplifies HTTP requests to the backend API.
- ESLint + Prettier - Ensures code consistency and quality.
- Jest + React Testing Library - Provides unit and integration testing for form validation and API interactions.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/denliehoo/broccoli-and-co.git
   cd broccoli-and-co
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running Tests

To run unit and integration tests:

```sh
npm run test
```

## Deployment

To build the app for production:

```sh
npm run build
```

To start the production server:

```sh
npm run start
```

## Notes

- The UI is fully responsive and works well on both desktop and mobile.
- The project follows best practices for maintainability and performance.
- Form validation is implemented to prevent unnecessary API calls.
