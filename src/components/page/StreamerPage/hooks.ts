import { useCallback, useRef } from "react";

import { StreamerText } from "@/models";
import { useDiary } from "@/states/diary";
import { useStreamService } from "@/usecase";
import { guardUndef } from "@/utils";

export const useStreamer = () => {
    const { sendToServer } = useStreamService();
    const {
        client: { clientText, setClientText },
    } = useDiary();

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const updateText = useCallback(
        (text: StreamerText) => {
            setClientText(text);
        },
        [setClientText]
    );

    const handleInputChange = useCallback(
        (streamerText: StreamerText) => {
            updateText(streamerText);
            sendToServer({
                text: streamerText,
                cursorPosition: guardUndef(textareaRef.current?.selectionStart),
            });
        },
        [updateText, sendToServer]
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
