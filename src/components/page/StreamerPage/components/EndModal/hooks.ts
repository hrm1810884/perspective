import { useCallback } from "react";
import { match } from "ts-pattern";

import { PrivacyLevel } from "@/models";
import { useExperenceStates } from "@/states";
import { saveDiary } from "@/usecase";

import { useStreamer } from "../../hooks";

export const useEndModal = () => {
    const { experienceState, diaryHandler } = useExperenceStates();
    const { clientText } = useStreamer();
    const isEndModalOpen = experienceState.stage === "finish";

    const handleClose = useCallback(() => {
        diaryHandler.handleExperience();
    }, [diaryHandler]);

    const handleClick = useCallback(() => {
        diaryHandler.handleInit();
    }, [diaryHandler]);

    const handleSave = useCallback(
        async (privacyLevel: PrivacyLevel) => {
            const res = await saveDiary(clientText, privacyLevel);
            match(res)
                .with({ status: "ok" }, () => {
                    diaryHandler.handleInit();
                })
                .with({ status: "err" }, () => {
                    console.error(res.err);
                });
        },
        [clientText, diaryHandler]
    );

    return {
        isEndModalOpen,
        handler: { handleClick, handleClose, handleSave },
    };
};
