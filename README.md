
# 🎮 Think & Guess Host App

Welcome to the **Think & Guess Host App!**  
This is the control center for managing the **Think & Guess** game experience.  
As the host, you can create games, monitor players, send questions, and display results in real time. Your role is essential to ensuring the game runs smoothly and everyone has fun! 🚀

---

## 🤔 What is Think & Guess?

**Think & Guess** is a real-time, interactive multiplayer quiz game.  
The **Host App** controls the game logic, while players connect through the **Player App**.

---

## 🤝 How It Works

The **Host App** interacts with the **Player App** in real time via WebSockets.

### Game Flow:
1. 🎉 **Create a Game:** Launch a session and share the QR code or game code with players.
2. 📨 **Send Questions:** Manage game content and send questions through the backend.
3. 🔄 **Real-Time Updates:** Players receive updates instantly, answer questions, and view live results.
4. 🏆 **Results Display:** Show rankings and feedback after each round.

---

## 🎤 Host Responsibilities
- 📝 **Create Engaging Questions:** Ensure the game stays fun and challenging.
- ⏩ **Control Game Flow:** Start rounds, move between questions, and display results.
- 👥 **Monitor Participation:** Keep track of who joins and how they perform.

---

## 🚀 Features
- Real-time communication with **Socket.IO**
- Player management and session control
- Dynamic question delivery and live results
- QR code generation for easy player access
- Smooth UI animations with **Framer Motion**
- Toast notifications for game events

---

## 🛠️ Tech Stack & Dependencies

### Framework & Libraries
- **React** `^19.0.0`
- **React Router DOM** `^7.2.0` - Routing
- **Zustand** `^5.0.3` - State management
- **Axios** `^1.8.1` - API requests
- **Socket.IO Client** `^4.8.1` - Real-time communication
- **QR Code React** `^4.2.0` - QR Code generator

### Styling
- **Tailwind CSS** `^4.0.9`
- **@emotion/react & styled** `^11.14.0`
- **Framer Motion** `^12.4.11` - Animations

### UI Enhancements
- **React Toastify** `^11.0.5` - Notifications

---

## 📂 Project Structure

```
├── src
│   ├── assets/           # Images and static assets
│   ├── components/       # Reusable UI components (Buttons, Modals, etc.)
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components (Home, Game, Results, etc.)
│   ├── services/         # API calls and socket connections
│   ├── types/            # TypeScript type definitions
│   ├── App.css           # App-specific styles
│   ├── App.tsx           # Main app component and routing
│   ├── index.css         # Global styles (Tailwind import)
│   ├── main.tsx          # App entry point
│   ├── store.ts          # Zustand state management setup
│   └── vite-env.d.ts     # Vite environment types
```

---

## ⚙️ Installation & Setup

1. **Clone the repository:**

```bash
git clone https://github.com/Edwinleon95/DoodleGuess_FrontEnd.git
```

2. **Navigate to the project folder:**

```bash
cd DoodleGuess_FrontEnd
```

3. **Install dependencies:**

```bash
npm install
```

4. **Run the development server:**

```bash
npm run dev
```

---

