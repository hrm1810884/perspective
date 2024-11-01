import { ReceiverId } from "@/models";

export const finishSteps = [1, 2] as const;

export type FinishSteps = (typeof finishSteps)[number];

type ButtonPosition = {
    top: string;
    left: string;
    width: string;
    height: string;
};

type ButtonInfo =
    | {
          id: ReceiverId;
          position: ButtonPosition;
          prompt: string;
      }
    | {
          id: -1;
          position: ButtonPosition;
          prompt: null;
      };

export const buttonList: Array<ButtonInfo> = [
    {
        id: -1,
        position: { top: "133.5px", left: "203.5px", width: "85px", height: "143px" },
        prompt: null,
    },
    {
        id: 1,
        position: { top: "0.5px", left: "54.5px", width: "98px", height: "171px" },
        prompt: "真逆の意味合いに書き換えてください。",
    },
    {
        id: 2,
        position: { top: "214.5px", left: "0.5px", width: "136px", height: "89px" },
        prompt: "楽観的に書き替えてください。",
    },
    {
        id: 3,
        position: { top: "162.5px", left: "355.5px", width: "98px", height: "171px" },
        prompt: "悲観的に書き替えてください。",
    },
    {
        id: 4,
        position: { top: "58.5px", left: "309.5px", width: "125px", height: "74px" },
        prompt: "自己拡張的に書き換えてください。",
    },
];

export const isCenter = (id: number): boolean => id === -1;
