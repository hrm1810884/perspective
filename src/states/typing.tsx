import { useCallback, useRef } from "react";
import { match } from "ts-pattern";
import useSound from "use-sound";

import { ReceiverId, keyboardSettingById } from "@/models";
import { delay } from "@/utils";

import { useDiary } from "./diary";

export const useTyping = (id?: ReceiverId) => {
    const {
        client: { setClientText },
    } = useDiary();
    const {
        type: keyboardType,
        volume,
        delay: delayTime,
    } = keyboardSettingById[id === undefined ? "client" : id];
    const primarySoundFile = `/typing-${keyboardType}-primary.mp3`;
    const secondarySoundFile = `/typing-${keyboardType}-secondary.mp3`;

    const [playPrimary] = useSound(primarySoundFile, { volume });
    const [playSecoundary] = useSound(secondarySoundFile, { volume });

    const audioCountRef = useRef<number>(0);

    const handleShortTypingSound = useCallback(async () => {
        await delay(delayTime);
        match(audioCountRef.current)
            .with(0, () => {
                playPrimary();
                audioCountRef.current = 1;
            })
            .with(1, () => {
                playSecoundary();
                audioCountRef.current = 0;
            });
    }, [audioCountRef, playPrimary, playSecoundary, delayTime]);

    const handleTypingText = useCallback(
        async (text: string) => {
            for (let index = 0; index <= text.length; index++) {
                setClientText(text.slice(0, index));
                const randomDelay = Math.random() * 300;
                console.log(randomDelay);
                await delay(randomDelay);
            }
        },
        [setClientText]
    );

    return {
        handler: {
            handleShortTypingSound,
            handleTypingText,
        },
    };
};
