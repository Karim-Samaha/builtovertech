# 🧭 Next.js Assessment Project

This is a **Next.js 14 application built with the App Router**, bootstrapped using [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).  
The project was developed as part of a **technical assessment**, focusing on:

- ✅ Clean and modular **feature-based architecture**  
- 🧱 Reusable **UI components** and shared utilities  
- 📝 Form handling & dynamic rendering  
- 🧪 Comprehensive **unit testing** with Jest  
- 🐳 Optional **Docker Compose** setup for quick environment setup

---

## 🧭 Project Structure

This project follows a **feature-based (modular) structure**:

├─ app: (app routes and pages)
├─ features/
│ └─ dynamic-table/
│ ├─ components/
│ ├─ hooks/
│ ├─ types/
│ ├─ tests/
│ └─ ...
└─ shared/
├─ components/ # shared UI components (e.g. buttons, tables, inputs)
├─ hooks/ # reusable hooks
├─ utils/ # helper functions
├─ types/ # shared TypeScript types/interfaces
└─ tests/ # shared tests if needed


## 🧭 How to run

## 🐋 Recommended: Running with Docker

cd .docker
docker compose up --build


## Running Locally (Node.js >= 20.12.0)

Install dependencies:

npm install


💻 Start the development server:

npm run dev

🧪 Running Tests

npm run test

📦 Building and Previewing

To build for production:

npm run build

To preview the production build locally:

npm start



