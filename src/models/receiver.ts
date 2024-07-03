export const receiverId = [0, 1, 2, 3] as const;

export type ReceiverId = (typeof receiverId)[number];
