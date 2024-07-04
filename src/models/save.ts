import { ReceiverId } from "./receiver";
import { StreamerText } from "./socket";

export type PrivacyLevel = "public" | "private";

export type SaveItem = {
    diary: StreamerText;
    isPublic: boolean;
    favoriteId: ReceiverId | null;
};
