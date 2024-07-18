import { deleteUser } from "@/generated/api";
import { UsecaseError, UsecaseMethod, UsecaseOk } from "@/utils";

export const deleteUserData = (async () => {
    try {
        const res = await deleteUser();
        console.log("ユーザ情報削除");
        console.log(res);
        return UsecaseOk(null);
    } catch (err) {
        return UsecaseError(new Error("ユーザ情報の削除失敗"));
    }
}) satisfies UsecaseMethod;
