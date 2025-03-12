import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalStore } from "../store";
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import CreateButton from '../components/CreateButton';
import CategoryList from '../components/CategoryList';

const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;

interface CreateRoomResponse {
    id: number;
}

const CreateRoom: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { selectedCategoryId, setRoomId } = useGlobalStore();

    const handleCreateRoom = async () => {
        if (!selectedCategoryId) {
            toast.warning('Please select a category first!');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post<CreateRoomResponse>(
                `${BACKEND_URL}/rooms`,
                { categoryId: selectedCategoryId }
            );
            const roomId = response.data.id;
            setRoomId(roomId);
            navigate(`/room/${roomId}`);
        } catch (error) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || error.message
                : 'Failed to create room';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-600 to-purple-700"
        >
            <h1
                className="text-4xl md:text-6xl font-extrabold text-white mb-8 text-center drop-shadow-lg"
            >
                Choose a Category
            </h1>
            <CategoryList />

            <CreateButton
                onClick={handleCreateRoom}
                disabled={!selectedCategoryId}
                loading={loading}
                className="px-12 py-6 text-2xl"
            >
                {loading ? 'Creating Room...' : 'Create Room'}
            </CreateButton>

        </motion.div>
    );
};

export default CreateRoom;