<h1 align="center">🎵 Realtime Spotify Application ✨</h1>

<p align="center">
A full-stack music streaming platform inspired by Spotify — enhanced with real-time features like chat, live user presence, and analytics. Built with React, Node.js, MongoDB, Clerk, and Cloudinary.
</p>

---

## 🚀 Features

- 🎸 Stream music with play/pause, next/previous controls
- 🔊 Volume control with interactive slider
- 👨‍💼 Admin dashboard to create & manage albums and songs
- 💬 Real-time Chat App integrated into Spotify UI
- 🟢 Online / Offline user status
- 👀 View what other users are listening to in real-time
- 📊 Analytics dashboard with aggregated stats
- 🔐 Secure login via Clerk (Google & Facebook OAuth)
- 📁 File uploads (audio/image) using Cloudinary
- 🎨 Fully responsive and modern UI with Tailwind CSS

---

## 🛠️ Tech Stack

| Frontend | Backend | Auth | Storage | Real-time |
|----------|---------|------|---------|------------|
| React, TypeScript, Tailwind CSS | Node.js, Express, MongoDB | Clerk | Cloudinary | Zustand / Clerk Presence API |

---

## 📦 Folder Structure

```bash
├── backend/src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── main.tsx
└── README.md

⚙️ Environment Variables
🖥️ Backend .env
PORT=5000
MONGODB_URI=
ADMIN_EMAIL=
NODE_ENV=development

CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=

CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=