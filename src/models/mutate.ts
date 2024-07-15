import { DiaryText } from "./diary";

export const mutationStateList = ["ready", "pending", "cancel"] as const;

export type MutationStage = (typeof mutationStateList)[number];
export type MutationState = {
    diary: DiaryText;
    stage: MutationStage;
    mutatedLength: number;
};
