import { ReceiverId } from "./receiver";

const keyboardType = ["mechanical", "pantagraph"] as const;
export type KeyboardType = (typeof keyboardType)[number];

export type KeyboardSetting = {
    type: KeyboardType;
    volume: number;
    delay: number;
};

export const keyboardSettingById: Record<"client" | ReceiverId, KeyboardSetting> = {
    client: { type: "mechanical", volume: 1, delay: 0 },
    0: { type: "mechanical", volume: 0.5, delay: 500 },
    1: { type: "mechanical", volume: 0.3, delay: 200 },
    2: { type: "pantagraph", volume: 1, delay: 600 },
    3: { type: "pantagraph", volume: 0.3, delay: 100 },
};
