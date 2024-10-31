import { atom, useAtom } from "jotai";
import { useCallback } from "react";

import { ReceiverId, SaveItem } from "@/models";

const defaultSaveItem: SaveItem = {
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

    const resetSave = useCallback(() => {
        setSaveItem(defaultSaveItem);
    }, [setSaveItem]);

    return {
        saveItem,
        mutator: {
            saveFavoriteId,
            resetSave,
        },
    };
};
