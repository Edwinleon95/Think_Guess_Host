import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import NotFound from './pages/NotFound';
import CreateRoom from './pages/CreateRoom';
import Room from './pages/Room';
import CreatePlayer from './pages/CreatePlayer';
import PlayerGaimingZone from './pages/PlayerGaimingZone';
import MainGaimingZone from './pages/MainGaimingZone';
import WaitingZone from './pages/WaitingZone';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="/create-player" element={<CreatePlayer />} />
        <Route path="/gaiming-zone/waiting" element={<WaitingZone />} />
        <Route path="/gaiming-zone/player" element={<PlayerGaimingZone />} />
        <Route path="/gaiming-zone/main" element={<MainGaimingZone />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
