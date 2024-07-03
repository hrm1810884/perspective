import { useCallback } from "react";
import { match } from "ts-pattern";

import { PrivacyLevel } from "@/models";
import { useExperenceStates, useOverlayLoadingState } from "@/states";
import { saveDiary } from "@/usecase";
import { showToast } from "@/utils/toast";

import { useStreamer } from "../../hooks";

export const useFinishModal = () => {
    const {
        experienceState,
        mutator: { setStage, activateExperience },
    } = useExperenceStates();
    const { clientText } = useStreamer();
    const { runWithLoading } = useOverlayLoadingState();

    const isEndModalOpen = experienceState.stage === "finish";

    const handleClose = useCallback(() => {
        setStage("diary");
        activateExperience();
    }, [setStage, activateExperience]);

    const handleClick = useCallback(() => {
        setStage("demo");
    }, [setStage]);

    const handleSave = useCallback(
        async (privacyLevel: PrivacyLevel) => {
            const runSaveWithLoading = runWithLoading(
                async (text: string, privacy: PrivacyLevel) => await saveDiary(text, privacy)
            );

            const res = await runSaveWithLoading(clientText, privacyLevel);

            match(res)
                .with({ status: "ok" }, () => {
                    showToast({ message: "保存が完了しました", type: "success" });
                    setStage("diary");
                })
                .with({ status: "err" }, () => {
                    showToast({ message: "保存に失敗しました", type: "error" });
                });
        },
        [clientText, setStage, runWithLoading]
    );

    return {
        isEndModalOpen,
        handler: { handleClick, handleClose, handleSave },
    };
};
