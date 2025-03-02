import { useParams } from 'react-router-dom';

const Room = () => {
    const { roomId } = useParams<{ roomId: string }>(); // Get roomId from URL

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
            <h1 className="text-4xl font-bold text-white mb-4">Room ID: {roomId}</h1>
            <p className="text-xl text-white">
                This is the room with ID: <span className="font-bold">{roomId}</span>
            </p>
            <div className="mt-8">
                <p className="text-white text-lg">Enjoy your stay in the room!</p>
            </div>
        </div>
    );
};

export default Room;
