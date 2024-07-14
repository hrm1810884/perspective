import { ReceiverId } from "./receiver";

export type PrivacyLevel = "public" | "private";

export type SaveItem = {
    isPublic: boolean;
    favoriteId: ReceiverId | null;
};
