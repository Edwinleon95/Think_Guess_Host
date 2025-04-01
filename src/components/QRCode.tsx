import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";

const PLAYER_FRONTEND_URL = import.meta.env.VITE_PLAYER_FRONTEND_URL;

interface QRCodeProps {
    roomId: number | null;
}

export const QRCode: React.FC<QRCodeProps> = ({ roomId }) => {
    const qrValue = `${PLAYER_FRONTEND_URL}/create-player?roomId=${roomId}`;

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center space-y-2"
            style={{ position: "absolute", bottom: 10, left: 10 }}
        >
            <div className="bg-white p-1.5 rounded-md shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
                <QRCodeCanvas
                    value={qrValue}
                    size={80}
                    level="H"
                />
            </div>
            <p className="text-white text-xs font-medium">Join room {roomId}</p>
        </motion.div>
    );
};