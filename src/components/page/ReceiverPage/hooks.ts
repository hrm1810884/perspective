import { useCallback, useEffect } from "react";

import { ReceiverId } from "@/models";
import { useMutationStates, useTyping } from "@/states";
import { useAIMutation } from "@/usecase/getDiary";

export const useReceiver = (receiverId: ReceiverId) => {
    const { data, isLoading } = useAIMutation(receiverId);
    const {
        mutator: { updateMutationState },
    } = useMutationStates();

    useEffect(() => {
        if (data) {
            const { diary: mutatedDiary, mutatedLength } = data;
            console.log(`data updated : ${mutatedDiary}, ${mutatedLength}`);
            updateMutationState(data);
        }
    }, [data?.diary, data?.mutatedLength, updateMutationState]);

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
