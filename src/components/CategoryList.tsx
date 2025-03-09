import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalStore } from "../store"; // Import Zustand store

interface Category {
    id: number;
    name: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const CategoryList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const { selectedCategoryId, setSelectedCategoryId } = useGlobalStore(); // Zustand store


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                setError(""); // Reset error state before the request
                const response = await axios.get<Category[]>(`${BACKEND_URL}/categories`);
                setCategories(response.data);
            } catch (error) {
                setError("Failed to fetch categories. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategoryId(Number(e.target.value)); // Store ID globally
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                {/* Add a loading spinner */}
                <div className="spinner"></div>
                <p>Loading categories...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center text-red-500">
                {/* Display error message */}
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-6 p-4">
            <h2 className="text-3xl font-semibold text-gray-800">Select a Category</h2>

            <select
                value={selectedCategoryId || ""}
                onChange={handleCategoryChange}
                className="w-full max-w-xs px-4 py-3 text-lg font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            >
                <option value="" className="text-gray-400">-- Select Category --</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="text-gray-700">
                        {cat.name}
                    </option>
                ))}
            </select>
        </div>

    );
};

export default CategoryList;
