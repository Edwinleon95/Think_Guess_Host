import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalStore } from "../store";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Category } from "../types/category.interface";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CategoryList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const { selectedCategoryId, setSelectedCategoryId } = useGlobalStore();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get<Category[]>(`${BACKEND_URL}/categories`);
                setCategories(response.data);
            } catch (error) {
                toast.error("Failed to load categories. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center space-y-4 py-8"
            >
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                <p className="text-xl font-medium text-white">Loading Categories...</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl p-4"
        >
            {categories.map((cat) => (
                <motion.div
                    key={cat.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-6 rounded-2xl cursor-pointer transition-colors duration-300 ${selectedCategoryId === cat.id
                        ? 'bg-gradient-to-br from-green-400 to-blue-500'
                        : 'bg-white/10 hover:bg-white/20'
                        }`}
                    onClick={() => setSelectedCategoryId(cat.id)}
                >
                    <h3 className="text-2xl font-bold text-center text-white">
                        {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                    </h3>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default CategoryList;