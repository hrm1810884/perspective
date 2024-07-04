import { PrivacyLevel, SaveItem } from "@/models";
import { UsecaseError, UsecaseOk } from "@/utils";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const saveDiary = async (saveItem: SaveItem, privacyLevel: PrivacyLevel) => {
    try {
        await delay(1000);
        const res = await fetch("/api/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                diary: saveItem.diary,
                isPublic: privacyLevel === "public",
                favoriteId: saveItem.favoriteId,
            }),
        });
        return UsecaseOk(res);
    } catch (err) {
        return UsecaseError(new Error(`save diary error: ${err}`));
    }
};
