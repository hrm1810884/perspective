import { useCallback, useRef } from "react";

import { DiaryText } from "@/models";
import { useMutationStates } from "@/states/";
import { sendTextToAI, useStreamService } from "@/usecase";
import { guardRecursiveUndef, isBreakChar } from "@/utils";
import { match } from "ts-pattern";

const FETCH_COUNT = 2;

export const useStreamer = () => {
    const { sendToServer } = useStreamService();
    const {
        mutationState,
        mutator: { lockMutation, unlockMutation, updateText },
    } = useMutationStates();

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const mutateText = useCallback(
        async (targetText: DiaryText) => {
            lockMutation();
            sendToServer({
                diary: targetText,
                stage: "pending",
            });
            console.log("mutate start");
            const res = await sendTextToAI(targetText);
            match(res)
                .with({ status: "ok" }, () => {
                    const { mutatedLength: resMutatedLength } = guardRecursiveUndef(res.val);
                    unlockMutation(resMutatedLength);
                })
                .with({ status: "err" }, () => {
                    console.log("cancel mutation update");
                    unlockMutation(mutationState.mutatedLength);
                });
            sendToServer({
                diary: targetText,
                stage: "ready",
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
            sendToServer({ diary: clientText, stage: mutationState.stage });

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
        [updateText, mutateText, sendToServer, mutationState]
    );

    const handleReset = useCallback(() => {
        // updateText("");
        // sendToServer({
        //     text: "",
        //     cursorPosition: 0,
        // });
    }, []);

    const handleResend = useCallback(async () => {
        // const currentText = clientText;
        // console.log(`${currentText}を再送`);
        // sendToServer({
        //     text: "",
        //     cursorPosition: 0,
        // });
        // await delay(100);
        // sendToServer({
        //     text: currentText,
        //     cursorPosition: 0,
        // });
    }, []);

    return {
        textareaRef,
        diaryText: mutationState.diary,
        mutator: { updateText },
        handler: {
            handleInputChange,
            handleReset,
            handleResend,
        },
    };
};
