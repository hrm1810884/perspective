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

    const updateMutatedLength = useCallback(
        (length: number) => {
            setMutationState((prev) => ({
                ...prev,
                mutatedLength: length,
            }));
        },
        [setMutationState]
    );

    const updateReceiverMutationState = useCallback(
        (data: MutationState, streamerMutatedLength: number) => {
            setMutationState((prev) => ({
                mutatedLength: data.mutatedLength,
                diary: data.diary + prev.diary.slice(streamerMutatedLength),
            }));
        },
        [setMutationState]
    );

    return {
        mutationState,
        mutator: {
            updateText,
            updateReceiverMutationState,
            updateMutatedLength,
        },
    };
};
