# 🐾 WildGuard AI

## AI-Powered Wildlife Detection & Monitoring System

WildGuard AI is an AI-powered wildlife monitoring and animal detection system designed to identify animals from uploaded images using YOLO-based computer vision technology.

The system provides a modern monitoring dashboard where users can upload wildlife images, detect animals, view confidence scores, manage detection history, inspect individual detection results, and analyze wildlife detection statistics.

---

## 🌍 Project Overview

WildGuard AI combines:

- Artificial Intelligence
- Computer Vision
- YOLO Object Detection
- React.js
- Node.js
- Express.js
- MongoDB

The main goal of the project is to provide a simple and intelligent platform for wildlife image analysis and monitoring.

---

# ✨ Features

## 🤖 AI Animal Detection

WildGuard AI allows users to upload wildlife images and automatically detect animals using a YOLO-based detection system.

Features include:

- Wildlife image upload
- AI-powered animal detection
- Animal name identification
- Confidence score
- Total animal count
- Detection result preview
- Automatic database storage

---

## 📊 Dashboard

The dashboard provides an overview of the complete wildlife monitoring system.

### Dashboard includes:

- Total Images
- Total Animals Detected
- Average AI Confidence
- Most Detected Animal
- Recent Detection History
- Live System Status
- AI Monitoring Interface

---

## 📋 Detection History

The Detection History page stores all previously analyzed wildlife images.

Users can:

- View previous detections
- Search animal detections
- Filter animals
- View detection details
- Delete detection records
- View detection date and time
- View confidence percentage
- View total animals detected

---

## 🔍 Detection Details

Each detection has a dedicated details page.

The details page displays:

- Original wildlife image
- Detected animal
- AI confidence
- Total animals
- Detection date
- Detection time
- AI analysis status
- Download image option
- Delete detection option

---

## 📈 Statistics

WildGuard AI provides visual analytics for wildlife detection data.

### Available charts:

- Animal Distribution
- Daily Detection
- Weekly Detection

### Statistics summary:

- Total Detections
- Species Detected
- Active Days
- Peak Detection

Charts are implemented using Recharts.

---

## 🎨 User Interface

The application uses a modern dark wildlife-monitoring design.

UI features include:

- Dark theme
- Responsive layout
- Dashboard cards
- Interactive charts
- Modern buttons
- Detection status indicators
- Confidence progress bars
- Responsive mobile design
- Wildlife-focused visual design

---

# 🏗️ Project Architecture

```text
WildGuard AI
│
├── frontend/
│   │
│   └── frontend/
│       │
│       ├── public/
│       │
│       ├── src/
│       │   │
│       │   ├── components/
│       │   │   ├── DetectionList.jsx
│       │   │   ├── UploadArea.jsx
│       │   │   └── Wildlife3D.jsx
│       │   │
│       │   ├── hooks/
│       │   │   ├── useFetch.js
│       │   │   └── useDarkMode.js
│       │   │
│       │   ├── pages/
│       │   │   ├── Dashboard.jsx
│       │   │   ├── Detect.jsx
│       │   │   ├── History.jsx
│       │   │   ├── Details.jsx
│       │   │   └── Statistics.jsx
│       │   │
│       │   ├── services/
│       │   │   └── api.js
│       │   │
│       │   ├── styles/
│       │   │   ├── dashboard.css
│       │   │   ├── detect.css
│       │   │   ├── history.css
│       │   │   ├── details.css
│       │   │   ├── statistics.css
│       │   │   ├── navbar.css
│       │   │   └── sidebar.css
│       │   │
│       │   ├── App.jsx
│       │   └── main.jsx
│       │
│       ├── package.json
│       └── vite.config.js
│
│
├── backend/
│   │
│   ├── controllers/
│   │   └── detection.controller.js
│   │
│   ├── models/
│   │   └── Detection.js
│   │
│   ├── routes/
│   │   └── detection.routes.js
│   │
│   ├── services/
│   │   └── yolo.service.js
│   │
│   ├── uploads/
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
│
├── .gitignore
└── README.md

🔄 System Workflow

                    ┌──────────────────┐
                    │      USER        │
                    └────────┬─────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │ Upload Wildlife     │
                  │ Image               │
                  └─────────┬───────────┘
                            │
                            ▼
                  ┌─────────────────────┐
                  │ React Frontend      │
                  └─────────┬───────────┘
                            │
                            ▼
                  ┌─────────────────────┐
                  │ Express REST API    │
                  └─────────┬───────────┘
                            │
                            ▼
                  ┌─────────────────────┐
                  │ YOLO Detection      │
                  └─────────┬───────────┘
                            │
                ┌───────────┼───────────┐
                ▼           ▼           ▼
             Animal     Confidence    Count
                │           │           │
                └───────────┼───────────┘
                            │
                            ▼
                  ┌─────────────────────┐
                  │ MongoDB             │
                  │ Detection Storage   │
                  └─────────┬───────────┘
                            │
                            ▼
                  ┌─────────────────────┐
                  │ Frontend Result     │
                  └─────────────────────┘


  🛠️ Technologies Used

Backend

  | Technology | Purpose               |
| ---------- | --------------------- |
| Node.js    | Backend Runtime       |
| Express.js | REST API              |
| MongoDB    | Database              |
| Mongoose   | MongoDB ODM           |
| Multer     | Image Upload          |
| YOLO       | Animal Detection      |
| CORS       | Cross-Origin Requests |

Frontend

| Technology   | Purpose                  |
| ------------ | ------------------------ |
| React.js     | User Interface           |
| Vite         | Development & Build Tool |
| React Router | Page Navigation          |
| Axios        | API Communication        |
| Recharts     | Statistics Charts        |
| React Icons  | UI Icons                 |
| CSS3         | Styling                  |


🧠 AI Detection

WildGuard AI uses a YOLO-based computer vision service for animal detection.

The detection pipeline is:

Wildlife Image
      │
      ▼
Image Upload
      │
      ▼
YOLO Model
      │
      ▼
Object Detection
      │
      ├───────────────┐
      ▼               ▼
Animal Name       Confidence
      │               │
      └───────┬───────┘
              ▼
        Total Animals
              │
              ▼
          MongoDB

🗄️ Database Structure

The detection collection contains information similar to:

Detection
│
├── imageName
│
├── imagePath
│
├── detectedAnimals
│   │
│   ├── name
│   └── confidence
│
├── totalAnimals
│
└── createdAt

🔐 Environment Variables

Create:

backend/.env

PORT=5000

MONGO_URI=your_mongodb_connection_string


💻 Installation
Prerequisites

Install the following before running the project:

Node.js
npm
MongoDB
Git
YOLO environment/model required by the backend

⚙️ Backend Installation

Open another terminal.

Navigate to backend:

cd backend

Install dependencies:

npm install

Start backend:

npm run dev

If your backend uses a normal Node start command:

npm start

Backend:

http://localhost:5000


🎨 Frontend Installation

Navigate to frontend:

cd frontend/frontend

Install dependencies:

npm install

Start development server:

npm run dev

Frontend:

http://localhost:5173


🧩 Project Modules

┌───────────────────────────────────────┐
│            WildGuard AI               │
├───────────────────────────────────────┤
│                                       │
│  Dashboard                            │
│       │                               │
│       ├── Detection                   │
│       │      └── YOLO AI              │
│       │                               │
│       ├── History                     │
│       │      ├── Search               │
│       │      ├── Filter               │
│       │      └── Delete               │
│       │                               │
│       ├── Details                     │
│       │      ├── Image                │
│       │      ├── Confidence           │
│       │      └── Download             │
│       │                               │
│       └── Statistics                  │
│              ├── Pie Chart            │
│              ├── Line Chart           │
│              └── Bar Chart            │
│                                       │
└───────────────────────────────────────┘