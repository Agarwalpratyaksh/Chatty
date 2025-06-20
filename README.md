# 💬 Real-Time Chat App

A modern, full-stack real-time chat application built with **React**, **Node.js**, **Socket.IO**, and **TypeScript**. It includes authentication, cloud-based image uploads, customizable themes using **DaisyUI**, and a sleek, responsive UI.

![Chat Preview](./chat-group.png)

---

## ✨ Features

- 🔐 Authentication (Sign Up / Login)
- 💬 Real-time messaging using Socket.IO
- 🎨 Multiple themes powered by DaisyUI
- 🖼️ Cloudinary image upload support
- 🧠 Global state management using Zustand
- 🌙 Dark mode support
- 📱 Fully responsive layout
- ⚡ Fast and modern development setup with Vite

---

## 🛠 Tech Stack

### Frontend

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- Axios

### Backend

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Socket.IO](https://socket.io/)
- [MongoDB](https://www.mongodb.com/) + Mongoose
- [Cloudinary](https://cloudinary.com/) for image uploads
- JSON Web Token (JWT) for authentication

---

## 📁 Project Structure

```text
📦 root
├── backend/
│   ├── controllers/         # Authentication and message logic
│   ├── lib/                 # DB, Cloudinary, and socket configuration
│   ├── middleware/          # Auth middleware
│   ├── models/              # User and Message models
│   ├── routes/              # API endpoints
│   ├── types/               # Custom TypeScript declarations
│   └── index.ts             # Entry point
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── assets/          # Icons and images
│   │   ├── components/      # Chat UI components
│   │   ├── pages/           # Main views (Login, Signup, Chat, etc.)
│   │   ├── store/           # Zustand state management
│   │   ├── lib/             # Axios instance and utilities
│   │   └── main.tsx         # React entry
├── chat-group.png           # Screenshot or preview
├── README.md
├── .gitignore
├── package.json
└── tsconfig.json

````

### Prerequisites

* Node.js (v18+ recommended)
* MongoDB (Atlas or local instance)
* Cloudinary account (for media uploads)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Agarwalpratyaksh/Chatty
cd Chatty
```

---

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file inside the `backend/` directory with the following content:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

### 4. Run the App Locally

#### Backend

```bash
cd backend
npm run dev
```

#### Frontend

```bash
cd ../frontend
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🖼 Themes with DaisyUI

This app uses [DaisyUI](https://daisyui.com/) for beautiful prebuilt themes. You can easily switch between themes like:

* `light`
* `dark`
* `cupcake`
* `bumblebee`
* `synthwave`
* and more!

Customize or set the theme via DaisyUI config or let users switch themes dynamically.

---

## ✅ Planned Features

* [ ] Group chat support
* [ ] Typing indicators
* [ ] Message read receipts
* [ ] Push notifications
* [ ] Emoji reactions

---

## 🤝 Contributing

Contributions, feedback, and suggestions are welcome!
Feel free to open an issue or submit a pull request.
