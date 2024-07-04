import { atom, useAtom } from "jotai";
import { useCallback } from "react";

import { ReceiverId, SaveItem, StreamerText } from "@/models";

const defaultSaveItem: SaveItem = {
    diary: "",
    isPublic: false,
    favoriteId: null,
};

const saveItemAtom = atom<SaveItem>(defaultSaveItem);

export const useSaveStates = () => {
    const [saveItem, setSaveItem] = useAtom(saveItemAtom);

    const saveFavoriteId = useCallback(
        (id: ReceiverId) => {
            setSaveItem((prev) => ({ ...prev, favoriteId: id }));
        },
        [setSaveItem]
    );

    const saveDiaryText = useCallback(
        (text: StreamerText) => {
            setSaveItem((prev) => ({ ...prev, diary: text }));
        },
        [setSaveItem]
    );

    const resetSave = useCallback(() => {
        setSaveItem(defaultSaveItem);
    }, [setSaveItem]);

    return {
        saveItem,
        mutator: {
            saveFavoriteId,
            saveDiaryText,
            resetSave,
        },
    };
};
