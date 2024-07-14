import { updateResult } from "@/generated/api";
import { UpdateResultBody } from "@/generated/model";
import { PrivacyLevel, SaveItem } from "@/models";
import { guardUndef, UsecaseError, UsecaseMethod, UsecaseOk } from "@/utils";

export const saveResult = (async (saveItem: SaveItem, privacyLevel: PrivacyLevel) => {
    const reqBody: UpdateResultBody = {
        isPublic: privacyLevel === "public",
        favoriteId: guardUndef(saveItem.favoriteId),
    };
    try {
        const res = await updateResult(reqBody);
        console.log("---データ保存---");
        console.log(reqBody);
        return UsecaseOk(res);
    } catch (error) {
        return UsecaseError(new Error(`データ保存失敗: ${error}`));
    }
}) satisfies UsecaseMethod;
