# Personal Portfolio Website

A full-stack personal portfolio website built for the Thiranex task.

## Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- Styling: CSS
- Deployment: Vercel (frontend) + Render/Railway (backend)

## Features
- Responsive modern portfolio
- Hero, About, Skills, Projects, Education and Contact sections
- Contact form connected to Express API
- MongoDB storage for contact messages
- Project data served by backend API
- Clean component structure
- Ready for GitHub and deployment

## Run locally

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
# Add your MongoDB URI to .env
npm run dev
```

Backend runs on `http://localhost:5000`.

### 2. Frontend
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on the URL shown by Vite, normally `http://localhost:5173`.

If the frontend and backend use different URLs, create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

## MongoDB
Create a MongoDB Atlas database and put its connection string in:
```env
MONGO_URI=your_connection_string
```

## Deployment
- Frontend: deploy `frontend` to Vercel.
- Backend: deploy `backend` to Render/Railway.
- Set `VITE_API_URL` on the frontend to your deployed backend API.
- Set `MONGO_URI` and `CLIENT_URL` on the backend.

## Personalization
Edit `frontend/src/data.js` to change your name, bio, skills and projects.
