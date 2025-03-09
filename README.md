# BROCCOLI & CO. LANDING PAGE

## Overview

This is a simple single-page web application for Broccoli & Co., an upcoming online service company. The application allows users to request an invitation by entering their Full name, Email, and Confirm email.

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

## Running unit tests

To run unit tests once:

```sh
npm run test
```

To run unit tests automatically upon code changes with regards to the latest commit:

```sh
npm run test:watch
```

## Running end-to-end integrations tests

Ensure to create a `cypress.env.json` in the root of the project with the code:

```JSON
{
    "usedEmail": "INPUT_USED_EMAIL_PROVIDED_BY_BACKEND"
}
```

If not done so, ensure that either the development server or production server is being ran:

```sh
# run the development server
npm run dev
# or run the production server
npm run start

```

We can then run our integeration tests command on a separate terminal:

```sh
npm run cypress
```

From there, cypress will pop up, then follow the steps:

1. Click on E2E Testing
2. Choose the browser of your choice (preferbly chrome)
3. Click on the Start E2E Testing button
4. The `Specs` tab will be selected by default
5. Click `E2E specs`
6. Under the `cypress\e2e` folder, click on `index.cy.ts` to run the integration tests

Note: Cypress will automatically run the tests whenever we make any code changes. Please close it when you're done with tests to prevent it from runnning unnecessarily

## Production

To build the app for production:

```sh
npm run build
```

To start the production server:

```sh
npm run start
```

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
- Axios + Abort Controllers - Simplifies HTTP requests to the backend API and aborts unncessary requests.
- ESLint + Prettier- Ensures code consistency and quality.
- Jest + React Testing Library - Provides unit testing
- Cypress - Peforms end-to-end integration testings

## Design & Styling

- Created reusable components (e.g. button, inputs) in the components folder
- Created a themes folder which includes color.ts and break-point.ts for consistent colors and break points
