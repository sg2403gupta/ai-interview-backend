# 🤖 AI Interview Coach

A full-stack MERN application that helps users practice technical interviews with AI-powered question generation, answer evaluation, and personalized feedback. Built with local AI models for privacy and cost-effectiveness.

![AI Interview Coach](https://img.shields.io/badge/MERN-Stack-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)

## ✨ Features

### 🎯 Core Features
- **AI-Powered Question Generation**: Dynamic interview questions based on topics
- **Two Practice Modes**:
  - 📚 **Ask AI Questions**: Get detailed AI answers to your interview questions
  - 💬 **Practice Answering**: Answer AI-generated questions and receive instant feedback
- **Smart Evaluation System**: AI + rule-based hybrid scoring for reliable feedback
- **Answer Modification**: Refine AI responses with custom instructions
- **Session History**: Track and review all practice sessions
- **Progress Analytics**: Monitor your improvement over time

### 🎨 UI/UX Features
- **Dark/Light Mode**: Seamless theme switching
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Modern, polished user experience
- **Real-time Feedback**: Instant AI responses and scoring

### 🔒 Security
- **JWT Authentication**: Secure user sessions
- **Password Hashing**: bcrypt encryption
- **Protected Routes**: Middleware-based authorization

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### AI/ML
- **Ollama** - Local LLM server
- **Llama 2** - AI model
- **Axios** - API communication

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Ollama** - [Download](https://ollama.ai/)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ai-interview-coach.git
cd ai-interview-coach
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/ai-interview-game
# JWT_SECRET=your_super_secret_jwt_key_change_this
# OLLAMA_API_URL=http://localhost:11434
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

### 4. Install and Setup Ollama
```bash
# Install Ollama from https://ollama.ai/

# Pull the Llama 2 model
ollama pull llama2

# Verify installation
ollama list
```

## ▶️ Running the Application

### Start MongoDB
```bash
# Windows
mongod

# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Start Ollama
```bash
# In a new terminal
ollama serve
```

### Start Backend Server
```bash
# In backend directory
cd backend
npm run dev
```

Expected output:
```
🚀 Server running on http://localhost:5000
📡 API endpoint: http://localhost:5000/api
✅ MongoDB Connected Successfully
```

### Start Frontend Development Server
```bash
# In frontend directory
cd frontend
npm run dev
```

Expected output:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Access the Application

Open your browser and navigate to: **http://localhost:5173**

## 📁 Project Structure
```
ai-interview-coach/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Interview.js
│   │   └── PracticeSession.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── interview.js
│   │   └── practice.js
│   ├── middleware/
│   │   └── auth.js
│   ├── services/
│   │   └── aiService.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   └── AuthPage.jsx
│   │   │   ├── common/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── StatCard.jsx
│   │   │   │   └── Loading.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   └── PracticeModeCard.jsx
│   │   │   ├── history/
│   │   │   │   ├── HistoryView.jsx
│   │   │   │   └── SessionViewer.jsx
│   │   │   └── practice/
│   │   │       ├── PracticeSession.jsx
│   │   │       ├── TopicInput.jsx
│   │   │       └── MessageBubble.jsx
│   │   ├── context/
│   │   │   ├── ThemeContext.jsx
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

## 🎮 Usage

### 1. **Create an Account**
- Navigate to the registration page
- Enter your name, email, and password
- Click "Create Account"

### 2. **Choose Practice Mode**

#### Ask AI Questions Mode
- Select a topic (e.g., "React Hooks", "System Design")
- Ask any interview-related question
- Receive detailed AI-generated answers
- Modify answers if needed

#### Practice Answering Mode
- Select a topic
- Receive AI-generated interview questions
- Submit your answers
- Get instant scoring and feedback
- Request next question

### 3. **View History**
- Access all previous practice sessions
- Review questions and answers
- Track your progress
- Delete old sessions

### 4. **Customize Experience**
- Toggle dark/light mode
- View session statistics
- Modify AI responses

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-interview-game
JWT_SECRET=your_super_secret_jwt_key_change_this
OLLAMA_API_URL=http://localhost:11434
NODE_ENV=development
```

#### Frontend (src/services/api.js)
```javascript
const API_URL = 'http://localhost:5000/api';
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check MongoDB status
mongod --version

# Start MongoDB
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
```

### Ollama Not Running
```bash
# Check if Ollama is installed
ollama --version

# Start Ollama server
ollama serve

# Pull model if missing
ollama pull llama2
```

### Port Already in Use
```bash
# Change backend port in .env
PORT=5001

# Update frontend API URL
# In frontend/src/services/api.js
const API_URL = 'http://localhost:5001/api';
```

### CORS Errors
Ensure backend CORS configuration matches frontend URL:
```javascript
// backend/server.js
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Slow AI Responses
```bash
# Use a faster model
ollama pull llama2:7b-chat

# Reduce response length in aiService.js
options: { temperature: 0.7, num_predict: 200 }
```

## 🧪 Testing
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📦 Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build

# Preview production build
npm run preview
```

## 🚢 Deployment

### Backend Deployment (Railway/Render)
1. Create account on Railway or Render
2. Connect GitHub repository
3. Add environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Create account on Vercel or Netlify
2. Connect GitHub repository
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy

### Database (MongoDB Atlas)
1. Create account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster
3. Get connection string
4. Update MONGODB_URI in backend

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Use ESLint for JavaScript
- Follow Airbnb style guide
- Write meaningful commit messages
- Add comments for complex logic

## 📝 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Practice Endpoints

#### Start Session
```http
POST /api/practice/start-session
Authorization: Bearer <token>
Content-Type: application/json

{
  "topic": "React Hooks",
  "mode": "ai-answers"
}
```

#### Generate Question
```http
POST /api/practice/generate-question
Authorization: Bearer <token>
Content-Type: application/json

{
  "sessionId": "session_id",
  "topic": "React Hooks",
  "previousQuestions": []
}
```

#### Get History
```http
GET /api/practice/history
Authorization: Bearer <token>
```


## 👨‍💻 Author

**Shubham Gupta**
- Email: shubham.gupta.stack@gmail.com

## 🙏 Acknowledgments

- [Ollama](https://ollama.ai/) for local LLM hosting
- [Meta AI](https://ai.meta.com/) for Llama 2 model
- [MongoDB](https://www.mongodb.com/) for database
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons

## 📊 Future Enhancements

- [ ] Voice input/output for answers
- [ ] Video interview simulation
- [ ] Resume analysis and suggestions
- [ ] Mock interview scheduling
- [ ] Performance analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Social features (share scores, leaderboards)
- [ ] Integration with LinkedIn
- [ ] Company-specific interview prep

## 💡 Tips for Success

1. **Practice Regularly**: Consistency is key to improvement
2. **Review History**: Learn from past sessions
3. **Diverse Topics**: Practice across different areas
4. **Modify Answers**: Use the modify feature to deepen understanding
5. **Take Notes**: Keep track of important concepts

## 🔗 Useful Links

- [Ollama Documentation](https://github.com/ollama/ollama)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)


---

**⭐ If you find this project helpful, please give it a star on GitHub!**

Made with ❤️ by Shubham Gupta


🗃️Additional Files to Create

.env.example (Backend)

envPORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-interview-game
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
OLLAMA_API_URL=http://localhost:11434
NODE_ENV=development
.gitignore (Root)
gitignore# Dependencies
node_modules/
package-lock.json
yarn.lock

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/
.next/

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories
.vscode/
.idea/
*.swp
*.swo
*~

# OS files
.DS_Store
Thumbs.db

# Testing
coverage/

# Misc
*.pem
```

### `LICENSE` (MIT License)
```
MIT License

Copyright (c) 2024 Shubham Gupta

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
