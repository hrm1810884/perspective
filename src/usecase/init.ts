import { initializeUser } from "@/generated/api";
import { guardUndef, UsecaseError, UsecaseMethod, UsecaseOk } from "@/utils";

export const startExperience = (async () => {
    try {
        const res = await initializeUser();
        const token = guardUndef(res.data.token);
        localStorage.setItem("token", token);
        console.log("---体験スタート---");
        console.log(res);
        return UsecaseOk(token);
    } catch (error) {
        return UsecaseError(new Error(`体験開始失敗: ${error}`));
    }
}) satisfies UsecaseMethod;
