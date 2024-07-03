const experienceStages = ["demo", "diary", "finish"] as const;

export type ExperienceStage = (typeof experienceStages)[number];

export const demoSelectionList = [
    { label: "本の下心", key: "book", value: "study" },
    { label: "りんごの夢", key: "apple", value: "apple" },
    { label: "ブラシの逆襲", key: "brush", value: "art" },
    { label: "鉛筆の本音", key: "pencil", value: "pencil" },
] as const;

export type DemoSelection = (typeof demoSelectionList)[number];

export type DemoSelectionByStage<S extends ExperienceStage> = S extends "demo"
    ? DemoSelection | null
    : null;

export type ExperienceState = {
    [S in ExperienceStage]: { stage: S; demoSelection: DemoSelectionByStage<S>; isActive: boolean };
}[ExperienceStage];
