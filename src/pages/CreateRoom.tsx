import { useNavigate } from 'react-router-dom';
import { useGlobalStore } from "../store";
import CategoryList from '../components/CategoryList';
import axios from 'axios';
import { useState } from 'react';

const CreateRoom = () => {
    const navigate = useNavigate();
    const { selectedCategoryId } = useGlobalStore();
    const [loading, setLoading] = useState(false); // State for loading
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleCreateRoom = async () => {
        if (!selectedCategoryId) return; // Prevent if no category selected

        setLoading(true); // Set loading to true when the request starts

        try {
            // Call the backend to create the room with the selectedCategoryId
            const response = await axios.post(`${BACKEND_URL}/rooms`, {
                categoryId: selectedCategoryId, // Send the selected category ID
            }, {
                headers: { "ngrok-skip-browser-warning": "true" }
            });

            // Get the room ID from the response (assuming the response contains the room details)
            const roomId = response.data.id;

            // Redirect to the room page using the room ID
            navigate(`/room/${roomId}`);
        } catch (error) {
            console.error('Error creating room:', error);
            // Handle error (e.g., show an alert or message to the user)
        } finally {
            setLoading(false); // Set loading to false after the request completes
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
            <h1 className="text-4xl font-bold text-white mb-4">Choose a Category</h1>
            <CategoryList />

            <button
                onClick={handleCreateRoom}
                className={`px-8 py-4 text-2xl font-bold text-white rounded-lg transition duration-300 ${selectedCategoryId ? 'bg-red-500 hover:bg-red-600 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                disabled={!selectedCategoryId || loading} // Disable button if loading
            >
                {loading ? 'Creating Room...' : 'Create Room'} {/* Show loading text */}
            </button>

            {/* Loading spinner or text */}
            {loading && (
                <div className="mt-4 text-white text-xl">Loading...</div>
            )}
        </div>
    );
};

export default CreateRoom;
