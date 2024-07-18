import { useCallback } from "react";
import { match } from "ts-pattern";

import { PrivacyLevel, SaveItem } from "@/models";
import { useExperenceStates, useOverlayLoadingState } from "@/states";
import { useSaveStates } from "@/states/save";
import { saveResult } from "@/usecase";
import { deleteUserData } from "@/usecase/deleteUser";
import { showToast } from "@/utils/toast";

export const useSave = () => {
    const { runWithLoading } = useOverlayLoadingState();
    const { saveItem } = useSaveStates();
    const {
        mutator: { setStage },
    } = useExperenceStates();

    const handleUnSave = useCallback(async () => {
        const runUnSaveWithLoading = runWithLoading(async () => await deleteUserData());

        const res = await runUnSaveWithLoading();

        match(res)
            .with({ status: "ok" }, () => {
                showToast({ message: "体験データを削除しました", type: "success" });
                setStage("demo");
            })
            .with({ status: "err" }, () => {
                showToast({ message: "体験データの削除に失敗しました", type: "error" });
            });
    }, [setStage, runWithLoading]);

    const handleSave = useCallback(
        async (privacyLevel: PrivacyLevel) => {
            const runSaveWithLoading = runWithLoading(
                async (saveItem: SaveItem, privacy: PrivacyLevel) =>
                    await saveResult(saveItem, privacy)
            );

            const res = await runSaveWithLoading(saveItem, privacyLevel);

            match(res)
                .with({ status: "ok" }, () => {
                    showToast({ message: "保存が完了しました", type: "success" });
                    setStage("demo");
                })
                .with({ status: "err" }, () => {
                    showToast({ message: "保存に失敗しました", type: "error" });
                });
        },
        [setStage, runWithLoading, saveItem]
    );

    return { handler: { handleUnSave, handleSave } };
};
