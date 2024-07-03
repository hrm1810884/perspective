import { useCallback, useRef } from "react";
import { match } from "ts-pattern";
import useSound from "use-sound";

import { ReceiverId, keyboardSettingById } from "@/models";

export const useTypingSound = (id?: ReceiverId) => {
    const { type: keyboardType, volume } = keyboardSettingById[id === undefined ? "client" : id];
    const primarySoundFile = `/typing-${keyboardType}-primary.mp3`;
    const secondarySoundFile = `/typing-${keyboardType}-secondary.mp3`;

    const [playPrimary] = useSound(primarySoundFile, { volume });
    const [playSecoundary] = useSound(secondarySoundFile, { volume });

    const audioCountRef = useRef<number>(0);

    const handleTypingSound = useCallback(() => {
        match(audioCountRef.current)
            .with(0, () => {
                playPrimary();
                audioCountRef.current = 1;
            })
            .with(1, () => {
                playSecoundary();
                audioCountRef.current = 0;
            });
    }, [audioCountRef, playPrimary, playSecoundary]);

    return {
        handler: {
            handleTypingSound,
        },
    };
};
