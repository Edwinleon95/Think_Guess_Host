import { useRooms } from "../hooks/useRooms";

export default function RoomList() {
    const { rooms, loading } = useRooms();

    if (loading) return <p>Loading rooms...</p>;

    return (
        <div className="p-4 text-center">
            <h2 className="text-xl font-bold">Available Rooms</h2>
            {rooms.length === 0 ? (
                <p>No rooms available</p>
            ) : (
                <ul className="mt-4">
                    {rooms.map((room) => (
                        <li key={room.id} className="border p-2 my-2">
                            {room.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
