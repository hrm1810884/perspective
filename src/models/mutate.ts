import { GetAI200Result as DAiResult } from "@/generated/model";
import { DiaryText } from "./diary";

export const mutationStageList = ["ready", "pending", "cancel"] as const;

export type MutationStage = (typeof mutationStageList)[number];
export type MutationState = {
    diary: DiaryText;
    stage: MutationStage;
    mutatedLength: number;
};

export const mutateDataUtils = {
    convertData(data: DAiResult): { diary: DiaryText; mutatedLength: number } {
        return { diary: data.diary as DiaryText, mutatedLength: data.mutatedLength as number };
    },
};
