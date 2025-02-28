import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000"; // Adjust if needed

export function useRooms() {
    const [rooms, setRooms] = useState<{ id: number; name: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}/rooms`).then((res) => {
            setRooms(res.data);
            setLoading(false);
        });
    }, []);

    return { rooms, loading };
}
