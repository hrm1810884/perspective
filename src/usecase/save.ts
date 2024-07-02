import { PrivacyLevel, StreamerText } from "@/models";
import { UsecaseError, UsecaseOk } from "@/utils";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const saveDiary = async (text: StreamerText, privacyLevel: PrivacyLevel) => {
    try {
        await delay(1000);
        const res = await fetch("/api/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                diary: text,
                isPublic: privacyLevel === "public",
            }),
        });
        return UsecaseOk(res);
    } catch (err) {
        return UsecaseError(new Error(`save diary error: ${err}`));
    }
};
