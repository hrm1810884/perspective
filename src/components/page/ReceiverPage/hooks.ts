import { useCallback } from "react";

import { ReceiverId } from "@/models";
import { useMutationStates, useTyping } from "@/states";

export const useReceiver = (receiverId: ReceiverId) => {
    const { mutationState } = useMutationStates();
    const {
        handler: { handleShortTypingSound },
    } = useTyping(receiverId);

    const handleInputChange = useCallback(async () => {
        handleShortTypingSound();
        console.log(`diary: ${mutationState.diary}, stage: ${mutationState.stage}`);
    }, [mutationState, handleShortTypingSound]);

    return {
        handler: {
            handleInputChange,
        },
    };
};
