import { useEffect, useRef } from "react";

export const RunningAudio = ({
    playWhen,
    src
}: {
    playWhen: boolean;
    src: string;
}) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio only once
        if (!audioRef.current) {
            audioRef.current = new Audio(src);
            audioRef.current.loop = true;
            audioRef.current.preload = "auto";
        }

        // Handle play/pause
        const handleAudio = async () => {
            if (!audioRef.current) return;

            try {
                if (playWhen) {
                    await audioRef.current.play();
                } else {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                }
            } catch (error) {
                console.error("Audio error:", error);
            }
        };

        handleAudio();

        return () => {
            // Cleanup only on component unmount
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, [playWhen, src]); // Dependencies include playWhen

    // No need to render an audio element since we're creating it manually
    return null;
};