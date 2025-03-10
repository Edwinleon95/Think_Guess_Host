import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/Home";
import Landing from "./pages/Landing";
import NotFound from './pages/NotFound';
import CreateRoom from './pages/CreateRoom';
import Room from './pages/Room';
import CreatePlayer from './pages/CreatePlayer';
import PlayerGamingZone from './pages/PlayerGamingZone';
import MainGamingZone from './pages/MainGamingZone';
import WaitingZone from './pages/WaitingZone';
import FinishGame from './pages/FinishGame';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="/create-player" element={<CreatePlayer />} />
        <Route path="/gaming-zone/waiting" element={<WaitingZone />} />
        <Route path="/gaming-zone/player" element={<PlayerGamingZone />} />
        <Route path="/gaming-zone/main" element={<MainGamingZone />} />
        <Route path="/gaming-zone/finish" element={<FinishGame />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Toastify container - Always present */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // You can switch between "light", "dark", "colored"
      />
    </Router>
  );
}
