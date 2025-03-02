import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleCreateRoom = () => {
        navigate('/create-room'); // Redirect to create room page
    };

    const handleCreateTopic = () => {
        // Optionally, you can show a message or prevent any action if trying to click
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-blue-500 to-purple-600">
            {/* Left section: Create Room */}
            <div className="flex-1 flex items-center justify-center bg-green-500">
                <button
                    onClick={handleCreateRoom}
                    className="px-8 py-4 text-2xl font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300"
                >
                    Create Room
                </button>
            </div>

            {/* Right section: Create Topic */}
            <div className="flex-1 flex items-center justify-center bg-blue-500">
                <button
                    onClick={handleCreateTopic}
                    className="px-8 py-4 text-2xl font-bold text-white bg-blue-400 cursor-not-allowed opacity-50"
                    disabled
                >
                    Create Topic (Unavailable)
                </button>
            </div>
        </div>
    );
};

export default Home;