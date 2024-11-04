import { useCallback, useEffect } from "react";

import { ReceiverId } from "@/models";
import { useMutationStates, useTyping } from "@/states";
import { useAIMutation } from "@/usecase/getDiary";
import { guardUndef } from "@/utils";

export const useReceiver = (receiverId: ReceiverId) => {
    const { data, streamerMutatedLength, isLoading } = useAIMutation(receiverId);
    const {
        mutator: { updateReceiverMutationState },
    } = useMutationStates();

    useEffect(() => {
        if (!!data && !isLoading) {
            const { diary: mutatedDiary, mutatedLength } = data;
            console.log(`data updated : ${mutatedDiary}, ${mutatedLength}`);
            updateReceiverMutationState(data, guardUndef(streamerMutatedLength));
        }
    }, [
        data?.diary,
        data?.mutatedLength,
        updateReceiverMutationState,
        streamerMutatedLength,
        isLoading,
    ]);

    const {
        handler: { handleShortTypingSound },
    } = useTyping(receiverId);

    const handleInputChange = useCallback(async () => {
        handleShortTypingSound();
    }, [handleShortTypingSound]);

    return {
        isLoading,
        handler: {
            handleInputChange,
        },
    };
};
