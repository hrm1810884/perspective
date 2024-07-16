import { getAI } from "@/generated/api";
import { mutateDataUtils, ReceiverId } from "@/models";
import { guardUndef, UsecaseError, UsecaseMethod, UsecaseOk } from "@/utils";

export const getAiDiary = (async (id: ReceiverId) => {
    try {
        const {
            data: { result: data },
        } = await getAI(id);
        console.log(data);
        const convertedData = mutateDataUtils.convertData(guardUndef(data));
        return UsecaseOk(convertedData);
    } catch (err) {
        return UsecaseError(new Error("Get AI Error"));
    }
}) satisfies UsecaseMethod;
