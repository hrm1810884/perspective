import { useCallback, useRef } from "react";

import { DiaryText } from "@/models";
import { useMutationStates, useTyping } from "@/states/";
import { sendTextToAI, useStreamService } from "@/usecase";
import { guardUndef } from "@/utils";
import { match } from "ts-pattern";

const FETCH_COUNT = 20; //NOTE: 20文字以上入力されたらAIに送信

export const useStreamer = () => {
    const { sendToServer } = useStreamService();
    const {
        mutationState,
        mutator: { updateText, updateMutatedLength },
    } = useMutationStates();

    const {
        handler: { handleShortTypingSound },
    } = useTyping();

    const counterRef = useRef<number>(0);

    const mutateText = useCallback(
        async (targetText: DiaryText) => {
            console.log("mutate start");
            const res = await sendTextToAI(targetText);
            match(res)
                .with({ status: "ok" }, () => {
                    updateMutatedLength(guardUndef(res.val).mutatedLength);
                    console.log("successfully mutated");
                })
                .with({ status: "err" }, () => {
                    console.log("failed mutation");
                });
        },
        [sendTextToAI, updateMutatedLength]
    );

    const handleInputChange = useCallback(
        async (clientText: DiaryText) => {
            updateText(clientText);
            handleShortTypingSound();
            sendToServer({
                diary: clientText,
                mutatedLength: mutationState.mutatedLength,
            });

            if (counterRef.current >= FETCH_COUNT) {
                await mutateText(clientText);
                counterRef.current = 0;
            } else {
                counterRef.current++;
            }
        },
        [updateText, handleShortTypingSound, sendToServer, mutationState, mutateText, counterRef]
    );

    const handleReset = useCallback(async () => {
        updateText("");
        updateMutatedLength(0);
        sendToServer({
            diary: "",
            mutatedLength: 0,
        });
    }, [updateMutatedLength, updateText, sendToServer]);

    return {
        diaryText: mutationState.diary,
        mutator: { updateText },
        handler: {
            handleInputChange,
            handleReset,
        },
    };
};
