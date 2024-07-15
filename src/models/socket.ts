import { DiaryText } from "@/models";
import { breakChar } from "@/utils";
import { MutationState } from "./mutate";

export type SocketMessage = {
    diary: DiaryText;
    mutateState: MutationState;
};

export const convertTextToDiary = (rawText: string): DiaryText => {
    return rawText.split(breakChar);
};

export const convertPosToIndex = (pos: number, diary: DiaryText): number => {
    return diary.findIndex((str, idx) => diary.slice(0, idx + 1).join("").length >= pos);
};
