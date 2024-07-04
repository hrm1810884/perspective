import { useCallback } from "react";
import { match } from "ts-pattern";

import { PrivacyLevel } from "@/models";
import { useExperenceStates, useOverlayLoadingState } from "@/states";
import { saveDiary } from "@/usecase";
import { showToast } from "@/utils/toast";

import { useStreamer } from "../../hooks";

export const useEndModal = () => {
    const { experienceState, diaryHandler } = useExperenceStates();
    const { clientText } = useStreamer();
    const { runWithLoading } = useOverlayLoadingState();

    const isEndModalOpen = experienceState.stage === "finish";

    const handleClose = useCallback(() => {
        diaryHandler.handleExperience();
    }, [diaryHandler]);

    const handleClick = useCallback(() => {
        diaryHandler.handleInit();
    }, [diaryHandler]);

    const handleSave = useCallback(
        async (privacyLevel: PrivacyLevel) => {
            const runSaveWithLoading = runWithLoading(
                async (text: string, privacy: PrivacyLevel) => await saveDiary(text, privacy)
            );

            const res = await runSaveWithLoading(clientText, privacyLevel);

            match(res)
                .with({ status: "ok" }, () => {
                    showToast({ message: "保存が完了しました", type: "success" });
                    diaryHandler.handleInit();
                })
                .with({ status: "err" }, () => {
                    showToast({ message: "保存に失敗しました", type: "error" });
                });
        },
        [clientText, diaryHandler, runWithLoading]
    );

    return {
        isEndModalOpen,
        handler: { handleClick, handleClose, handleSave },
    };
};
