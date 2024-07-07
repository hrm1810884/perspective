import { useCallback, useRef } from "react";
import { match } from "ts-pattern";

import { ReceiverId, ReceiverText, convertStreamerTextToReceiverText } from "@/models";
import { useDiary, useMutationStates, useTyping } from "@/states";
import { sendTextToAI } from "@/usecase";
import { guardRecursiveUndef, guardUndef, isBreakChar } from "@/utils";

const FETCH_COUNT = 2;

export const useReceiver = (receiverId: ReceiverId) => {
    const {
        receiver: { receivedText, setReceivedText },
    } = useDiary();
    const {
        mutationState,
        mutator: { lockMutation, unlockMutation },
    } = useMutationStates();
    const {
        handler: { handleShortTypingSound },
    } = useTyping(receiverId);

    const clientTextRef = useRef<string>("");

    const updateText = useCallback(
        (mutatedText: string[]) => {
            setReceivedText((prevText) => [
                ...prevText.slice(0, mutationState.mutatedLength),
                ...mutatedText,
                ...prevText.slice(mutationState.mutatedLength + mutatedText.length),
            ]);
        },
        [setReceivedText, mutationState]
    );

    const mutateText = useCallback(
        async (targetText: string[]) => {
            lockMutation();
            const res = await sendTextToAI(targetText, receiverId, mutationState.mutatedLength);
            match(res)
                .with({ status: "ok" }, () => {
                    const {
                        mutatedText,
                        mutatedLength: resMutatedLength,
                        rawContents: rawText,
                    } = guardRecursiveUndef(res.val);
                    const clientText = guardUndef(clientTextRef.current);
                    const convertedClientText = convertStreamerTextToReceiverText(clientText);

                    if (
                        convertedClientText
                            .slice(resMutatedLength, resMutatedLength + mutatedText.length)
                            .join("") === rawText.join("")
                    ) {
                        updateText(mutatedText);
                        unlockMutation(mutatedText.length);
                    } else {
                        console.log("cancel mutation update");
                        unlockMutation(0);
                    }
                })
                .with({ status: "err" }, () => {
                    console.log(res.err?.message);
                    unlockMutation(0);
                });
        },
        [lockMutation, updateText, unlockMutation, receiverId, mutationState]
    );

    const isEndWithBreakChar = (text: ReceiverText) => {
        return text.length > 0 ? isBreakChar(text[text.length - 1].slice(-1)) : false;
    };

    const handleInputChange = useCallback(async () => {
        handleShortTypingSound();
        const clientText = guardUndef(clientTextRef.current);
        const convertedClientText = convertStreamerTextToReceiverText(clientText);
        // 句読点と改行の数をカウント

        const unmutatetdText = convertedClientText.slice(mutationState.mutatedLength);
        const mutateTarget = isEndWithBreakChar(unmutatetdText)
            ? unmutatetdText
            : unmutatetdText.slice(0, unmutatetdText.length - 1);
        console.log("---ターゲット情報---");
        console.log(mutateTarget, mutationState.mutatedLength, mutationState);
        const count = mutateTarget.length;

        if (count >= FETCH_COUNT && mutationState.stage === "ready") {
            console.log(`句点または改行が${FETCH_COUNT}回以上入力されました。: ${mutateTarget}`);
            await mutateText(mutateTarget);
        }
    }, [mutationState.stage, mutateText, handleShortTypingSound]);

    return {
        clientTextRef,
        receivedText,
        handler: {
            handleInputChange,
        },
    };
};
