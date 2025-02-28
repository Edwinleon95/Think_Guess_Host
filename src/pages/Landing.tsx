import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/home'); // Redirect to the home page
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
            <h1 className="text-6xl font-bold text-white mb-4">Welcome to</h1>
            <h2 className="text-8xl font-bold text-yellow-300 mb-8">Doodle Guess</h2>
            <button
                onClick={handleStart}
                className="px-8 py-4 text-2xl font-bold text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
            >
                Start
            </button>
        </div>
    );
};

export default Landing;