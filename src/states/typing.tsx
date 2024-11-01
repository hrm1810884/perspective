"use client";
import { useCallback, useRef, useState } from "react";
import { match } from "ts-pattern";
import useSound from "use-sound";

import { ReceiverId, keyboardSettingById } from "@/models";
import { delay } from "@/utils";

import { useMutationStates } from "./mutation";

export const useTyping = (id?: ReceiverId) => {
    const [isAudioContextAllowed, setIsAudioContextAllowed] = useState<boolean>(false);
    const {
        mutator: { updateText },
    } = useMutationStates();
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

    const allowAudioContext = useCallback(() => {
        setIsAudioContextAllowed(true);
    }, [setIsAudioContextAllowed]);

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
        (text: string, index: number) => {
            if (index <= text.length) {
                updateText(text.slice(0, index));
                const randomDelay = Math.random() * 300;
                setTimeout(() => handleTypingText(text, index + 1), randomDelay);
            }
        },
        [updateText]
    );

    return {
        isAudioContextAllowed,
        mutator: {
            allowAudioContext,
        },
        handler: {
            handleShortTypingSound,
            handleTypingText,
        },
    };
};
