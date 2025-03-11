import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
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
  const location = useLocation();

  return (
    <div className="h-screen bg-gradient-to-br from-blue-400 to-purple-500">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
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
      </AnimatePresence>

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
        theme="colored"
      />
    </div>
  );
}
