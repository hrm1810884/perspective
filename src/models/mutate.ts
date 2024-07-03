export const mutationStateList = ["ready", "pending", "cancel"] as const;

export type MutationStage = (typeof mutationStateList)[number];
export type MutationState = {
    stage: MutationStage;
    mutatedLength: number;
};
