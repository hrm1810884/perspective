import { useCallback } from "react";

import { ReceiverId } from "@/models";
import { useMutationStates, useTyping } from "@/states";
import { getAiDiary } from "@/usecase/getDiary";
import { guardRecursiveUndef } from "@/utils";
import { match } from "ts-pattern";

export const useReceiver = (receiverId: ReceiverId) => {
    const {
        mutationState,
        mutator: { updateText, unlockMutation },
    } = useMutationStates();
    const {
        handler: { handleShortTypingSound },
    } = useTyping(receiverId);

    const handleInputChange = useCallback(async () => {
        handleShortTypingSound();
    }, [mutationState, handleShortTypingSound]);

    const handleStateChange = useCallback(async () => {
        const response = await getAiDiary(receiverId);
        match(response)
            .with({ status: "ok" }, () => {
                const { diary: mutatedDiary, mutatedLength: resMutatedLength } =
                    guardRecursiveUndef(response.val);
                const newDiary = [...mutatedDiary, ...mutationState.diary.slice(resMutatedLength)];
                updateText(newDiary);
                unlockMutation(resMutatedLength);
            })
            .with({ status: "err" }, () => {
                console.log(`Error: ${response.err}`);
                unlockMutation(0);
            });
    }, [getAiDiary, updateText, unlockMutation]);

    return {
        handler: {
            handleInputChange,
            handleStateChange,
        },
    };
};
