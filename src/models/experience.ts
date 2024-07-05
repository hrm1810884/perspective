const experienceStages = ["demo", "diary"] as const;

export type ExperienceStage = (typeof experienceStages)[number];

export const demoSelectionList = [
    { label: "Prismatic Diary", key: "book", value: "study" },
    { label: "りんごの夢", key: "apple", value: "apple" },
    { label: "草枕", key: "brush", value: "art" },
    { label: "私のデイリルーティーン", key: "pencil", value: "pencil" },
] as const;

export type DemoSelection = (typeof demoSelectionList)[number];

export type DemoSelectionByStage<S extends ExperienceStage> = S extends "demo"
    ? DemoSelection | null
    : null;

export type ExperienceState = {
    [S in ExperienceStage]: { stage: S; demoSelection: DemoSelectionByStage<S> };
}[ExperienceStage];
