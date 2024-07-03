import { ReceiverId } from "./receiver";

const keyboardType = ["mechanical", "pantagraph"] as const;
export type KeyboardType = (typeof keyboardType)[number];

export type KeyboardSetting = {
    type: KeyboardType;
    volume: number;
};

export const keyboardSettingById: Record<"client" | ReceiverId, KeyboardSetting> = {
    client: { type: "mechanical", volume: 1 },
    0: { type: "mechanical", volume: 0.5 },
    1: { type: "mechanical", volume: 0.3 },
    2: { type: "pantagraph", volume: 1 },
    3: { type: "pantagraph", volume: 0.3 },
};
