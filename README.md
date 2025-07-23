# CuratorAI

**CuratorAI** is an AI-powered chat platform that enables users to have persistent, intelligent conversations with support for folders, real-time streaming responses, and Google authentication. It is built with a modern full-stack architecture using React, FastAPI, PostgreSQL, and Firebase.

---

## Features

- **Authentication**
  - Google OAuth via Firebase
  - JWT-based backend authentication
- **AI-Powered Chat**
  - Streamed responses from Ollama (or other local models)
  - Typing animations and assistant feedback
- **Persistent Conversations**
  - Save, rename, and organize chats into folders
  - Archive, delete, or manage chats with dropdown menus
- **User Interface**
  - Gemini-style full-screen layout
  - Gradient effects, dark mode, and responsive design
  - Sidebar with history, folders, and profile/logout buttons

---

## Tech Stack

| Layer         | Technology           |
|---------------|----------------------|
| Frontend      | React + Vite         |
| Styling       | Tailwind CSS         |
| Backend       | FastAPI (Python)     |
| Database      | PostgreSQL           |
| Auth          | Firebase + JWT       |
| ORM           | SQLAlchemy           |
| AI Model      | Ollama (local)       |
| Deployment    | Docker + Render      |

---

## Project Structure

```
CuratorAI/
├── frontend/                 # React + Vite frontend
│   ├── components/           # Shared components (ChatSidebar, ChatDashboard)
│   ├── pages/                # Route-based layout (Login, Register, Chat)
│   ├── firebase.js           # Firebase configuration
│   └── authService.js        # Token handling and auth logic
│
├── backend/
│   ├── app/
│   │   ├── api/v1/           # chat_routes.py, folder_routes.py, message_routes.py
│   │   ├── models/           # SQLAlchemy models: User, Chat, Message, ChatFolder
│   │   ├── services/         # get_current_user, firebase, ollama streaming
│   │   └── main.py           # FastAPI application entry
│   └── Dockerfile            # Backend Dockerfile
│
├── docker-compose.yml        # Orchestration for frontend/backend
├── .env.example              # Placeholder file for environment variables
└── README.md                 # You're here
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/curatorai.git
cd curatorai
```

### 2. Set up environment variables

Create a `.env` file in both `/backend` and `/frontend` using the provided `.env.example` files as a guide.  
**Do not commit real secrets to version control.**

### 3. Start the development environment

```bash
docker-compose up --build
```

---

## License

This project is licensed under the MIT License.
