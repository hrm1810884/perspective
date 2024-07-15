import { DiaryText } from "@/models";
import { MutationState } from "./mutate";

export type SocketMessage = {
    diary: DiaryText;
    mutateState: MutationState;
};
