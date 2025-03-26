// components/AutoPlayAudio.tsx
import { useEffect, useRef } from "react";

export const RevealAudio = ({
    playWhen,
    src
}: {
    playWhen: boolean;
    src: string;
}) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const hasPlayedRef = useRef(false);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(src);
            audioRef.current.preload = "auto";
        }

        if (playWhen && !hasPlayedRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play()
                .then(() => hasPlayedRef.current = true)
                .catch(e => console.error("Audio error:", e));
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                hasPlayedRef.current = false;
            }
        };
    }, [playWhen, src]);

    return null; // No DOM rendering needed
};