import { mutateText } from "@/generated/api";
import { MutateTextBody } from "@/generated/model";
import { DiaryText } from "@/models";

import { guardUndef, UsecaseError, UsecaseMethod, UsecaseOk } from "@/utils";

export const sendTextToAI = (async (text: DiaryText) => {
    const reqBody: MutateTextBody = {
        targetText: text,
    };

    try {
        const res = await mutateText(reqBody);
        console.log("---レスポンス情報---");
        console.log(res);
        return UsecaseOk(guardUndef(res.data.result));
    } catch (error) {
        return UsecaseError(new Error(`AI送信失敗: ${error}`));
    }
}) satisfies UsecaseMethod;
