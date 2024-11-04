import { GetAI200Result as DAiResult } from "@/generated/model";
import { DiaryText } from "./diary";

export const mutationStageList = ["ready", "pending", "cancel"] as const;

export type MutationStage = (typeof mutationStageList)[number];
export type MutationState = {
    diary: DiaryText;
    mutatedLength: number;
};

export const mutateDataUtils = {
    convertData(data: DAiResult): MutationState {
        return {
            diary: data.diary,
            mutatedLength: data.mutatedLength.ai,
        };
    },
};
