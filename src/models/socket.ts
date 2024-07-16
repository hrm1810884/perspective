import { MutationState } from "./mutate";

export type SocketMessage = Omit<MutationState, "mutatedLength">;
