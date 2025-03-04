import { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Adjust if needed

export function useRooms() {
    const [rooms, setRooms] = useState<{ id: number; name: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/rooms`).then((res) => {
            setRooms(res.data);
            setLoading(false);
        });
    }, []);

    return { rooms, loading };
}
