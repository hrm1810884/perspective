import { useCallback } from "react";

import { convertPosToIndex, DiaryText } from "@/models";
import { useMutationStates, useTyping } from "@/states/";
import { sendTextToAI, useStreamService } from "@/usecase";
import { delay, guardRecursiveUndef, isBreakChar } from "@/utils";
import { match } from "ts-pattern";

const FETCH_COUNT = 2;

export const useStreamer = () => {
    const { sendToServer } = useStreamService();
    const {
        mutationState,
        mutator: { lockMutation, unlockMutation, cancelMutation, updateText },
    } = useMutationStates();

    const {
        handler: { handleShortTypingSound },
    } = useTyping();

    const mutateText = useCallback(
        async (targetText: DiaryText) => {
            lockMutation();
            sendToServer({
                diary: targetText,
                stage: "pending",
                mutatedLength: mutationState.mutatedLength,
            });
            console.log("mutate start");
            await delay(1000);
            const res = await sendTextToAI(targetText);
            match(res)
                .with({ status: "ok" }, () => {
                    const { mutatedLength: resMutatedLength } = guardRecursiveUndef(res.val);
                    unlockMutation(resMutatedLength);
                    sendToServer({
                        diary: targetText,
                        stage: "ready",
                        mutatedLength: resMutatedLength,
                    });
                })
                .with({ status: "err" }, () => {
                    console.log("cancel mutation update");
                    unlockMutation(mutationState.mutatedLength);
                    sendToServer({
                        diary: targetText,
                        stage: "ready",
                        mutatedLength: mutationState.mutatedLength,
                    });
                });
        },
        [lockMutation, unlockMutation, sendTextToAI, sendToServer]
    );

    const isEndWithBreakChar = (text: DiaryText) => {
        return text.length > 0 ? isBreakChar(text[text.length - 1].slice(-1)) : false;
    };

    const handleInputChange = useCallback(
        async (clientText: DiaryText) => {
            updateText(clientText);
            handleShortTypingSound();
            sendToServer({
                diary: clientText,
                stage: mutationState.stage,
                mutatedLength: mutationState.mutatedLength,
            });

            const mutateTarget = isEndWithBreakChar(clientText)
                ? clientText
                : clientText.slice(0, clientText.length - 1);
            if (
                mutateTarget.slice(mutationState.mutatedLength).length >= FETCH_COUNT &&
                mutationState.stage === "ready"
            ) {
                await mutateText(clientText);
            }
        },
        [updateText, mutateText, sendToServer, mutationState, handleShortTypingSound]
    );

    const handleCursorPosition = useCallback(
        (cursorIndex: number) => {
            console.log(cursorIndex, mutationState.mutatedLength);
            if (cursorIndex < mutationState.mutatedLength) {
                console.log("updating mutated section");
                cancelMutation(cursorIndex);
            } else if (
                mutationState.stage === "cancel" &&
                (cursorIndex > mutationState.mutatedLength || cursorIndex === 0)
            ) {
                console.log("updated cancel mutation");
                unlockMutation(mutationState.mutatedLength);
            }
        },
        [convertPosToIndex, cancelMutation, unlockMutation, mutationState]
    );

    const handleReset = useCallback(() => {
        updateText([]);
        sendToServer({
            diary: [],
            stage: "ready",
            mutatedLength: 0,
        });
    }, [updateText, sendToServer]);

    const handleResend = useCallback(async () => {
        const mutateTarget = isEndWithBreakChar(mutationState.diary)
            ? mutationState.diary
            : mutationState.diary.slice(0, mutationState.diary.length - 1);
        if (mutateTarget.length >= FETCH_COUNT && mutationState.stage === "ready") {
            await mutateText(mutationState.diary);
        }
    }, [mutationState, mutateText]);

    return {
        diaryText: mutationState.diary,
        mutator: { updateText },
        handler: {
            handleInputChange,
            handleReset,
            handleResend,
            handleCursorPosition,
        },
    };
};
