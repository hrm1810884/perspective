import { useCallback, useRef } from "react";

import { StreamerText } from "@/models";
import { useDiary, useTypingSound } from "@/states/";
import { useStreamService } from "@/usecase";
import { guardUndef } from "@/utils";

export const useStreamer = () => {
    const { sendToServer } = useStreamService();
    const {
        client: { clientText, setClientText },
    } = useDiary();
    const {
        handler: { handleTypingSound },
    } = useTypingSound();

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const updateText = useCallback(
        (text: StreamerText) => {
            setClientText(text);
        },
        [setClientText]
    );

    const handleInputChange = useCallback(
        (streamerText: StreamerText) => {
            handleTypingSound();
            updateText(streamerText);
            sendToServer({
                text: streamerText,
                cursorPosition: guardUndef(textareaRef.current?.selectionStart),
            });
        },
        [updateText, sendToServer, handleTypingSound]
    );

    const handleReset = useCallback(() => {
        updateText("");
        sendToServer({
            text: "",
            cursorPosition: 0,
        });
    }, [updateText, sendToServer]);

    return {
        textareaRef,
        clientText,
        updateText,
        handler: {
            handleInputChange,
            handleReset,
        },
    };
};
