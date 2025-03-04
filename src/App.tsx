import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import NotFound from './pages/NotFound';
import CreateRoom from './pages/CreateRoom';
import Room from './pages/Room';
import CreatePlayer from './pages/CreatePlayer';
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
        <Route path="/waiting-zone" element={<WaitingZone />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
