export const receiverId = [1, 2, 3, 4] as const;

export type ReceiverId = (typeof receiverId)[number];
