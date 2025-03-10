import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalStore } from "../store";
import CategoryList from '../components/CategoryList';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

// Define the expected shape of the backend response for creating a room
const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;
interface CreateRoomResponse {
    id: string;
}

// Component type
const CreateRoom: FC = () => {
    
    const navigate = useNavigate();
    const { selectedCategoryId, loading, setLoading } = useGlobalStore();

    const handleCreateRoom = async (): Promise<void> => {
        if (!selectedCategoryId) {
            toast.warning('Please select a category first!');
            return;
        }

        setLoading(true);

        try {
            const response: AxiosResponse<CreateRoomResponse> = await axios.post(`${BACKEND_URL}/rooms`, {
                categoryId: selectedCategoryId,
            });

            const roomId = response.data.id;

            navigate(`/room/${roomId}`);
        } catch (error: unknown) {
            console.error('Error creating room:', error);

            // Optional: Type guard for error handling
            if (axios.isAxiosError(error)) {
                toast.error(`Failed to create room: ${error.message}`);
            } else {
                toast.error('Failed to create room. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-500 to-purple-600">
            <h1 className="text-5xl font-extrabold text-white mb-8 drop-shadow-lg animate-fade-in">
                Choose a Category
            </h1>

            <div className="w-full max-w-md animate-slide-up">
                <CategoryList />
            </div>

            <button
                onClick={handleCreateRoom}
                disabled={!selectedCategoryId || loading}
                className={`mt-10 px-8 py-4 text-xl font-semibold rounded-xl shadow-md transition-all duration-300 ease-in-out transform 
                    ${selectedCategoryId ? 'bg-red-500 hover:bg-red-600 active:scale-95' : 'bg-gray-400 cursor-not-allowed'} 
                    ${loading ? 'opacity-70' : ''} 
                    text-white focus:outline-none focus:ring-4 focus:ring-red-300`}
            >
                {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            ></path>
                        </svg>
                        <span>Creating Room...</span>
                    </div>
                ) : (
                    'Create Room'
                )}
            </button>

            {loading && !selectedCategoryId && (
                <div className="mt-4 text-white text-xl animate-pulse">Loading...</div>
            )}
        </div>
    );
};

export default CreateRoom;
