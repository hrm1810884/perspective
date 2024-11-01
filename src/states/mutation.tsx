/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { atom, useAtom } from "jotai";
import { useCallback } from "react";

import { DiaryText, MutationState } from "@/models";

const defaultMutationState: MutationState = {
    diary: "",
    mutatedLength: 0,
};

const mutationStateAtom = atom<MutationState>(defaultMutationState);

export const useMutationStates = () => {
    const [mutationState, setMutationState] = useAtom(mutationStateAtom);

    const updateText = useCallback(
        (text: DiaryText) => {
            setMutationState((prev) => ({
                ...prev,
                diary: text,
            }));
        },
        [setMutationState]
    );

    const updateMutationState = useCallback(
        (data: MutationState) => {
            setMutationState((prev) => ({
                ...prev,
                diary: data.diary + prev.diary.slice(data.mutatedLength),
            }));
        },
        [setMutationState]
    );

    return {
        mutationState,
        mutator: {
            updateText,
            updateMutationState,
        },
    };
};
