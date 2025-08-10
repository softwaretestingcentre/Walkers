# Walkers Meeting Minutes App

This is a Vite React app for recording and saving editable minutes from meetings. The app provides 9 editable sections based on the "Suggested Initial Work" bullet points for peer review groups.

## Features
- 9 editable sections, each with a prompt from the "Suggested Initial Work" list
- Save and load minutes for each section using your browser's local storage or a PostgreSQL database (via Netlify Functions and Neon)
- Simple, clear, and modern UI

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser to the local address shown in the terminal (usually http://localhost:5173)

## Backend & Persistence

- **Netlify Functions**: Serverless backend endpoints for saving and loading minutes
- **Neon PostgreSQL**: Persistent cloud database for storing meeting minutes
- **pg**: Node.js PostgreSQL client used in serverless functions

## How It Works
- Each section's notes are saved to the database via Netlify Functions (`/.netlify/functions/saveMinutes` and `getMinutes`).
- If the backend is unavailable, the app falls back to localStorage for offline use.
- The backend connection string is managed securely via environment variables (never committed to the repo).

## Project Structure
- `src/App.jsx`: Main app component with editable minutes sections and save-all logic
- `src/MinutesSection.jsx`: Reusable component for each section, handles API/localStorage logic
- `netlify/functions/`: Contains serverless functions for database access

## Development & Deployment
- Local development uses Vite for fast refresh and React HMR
- Deploy to Netlify for live backend/API endpoints and production hosting

---

This project was generated with Vite and React.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
