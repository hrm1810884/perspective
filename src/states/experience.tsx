import { atom, useAtom } from "jotai";
import { useCallback } from "react";
import { match } from "ts-pattern";

import { DemoSelection, ExperienceStage, ExperienceState } from "@/models";

const defaultExperienceState: ExperienceState = {
    stage: "demo",
    demoSelection: null,
    isActive: false,
};
const experienceStateAtom = atom<ExperienceState>(defaultExperienceState);

export const useExperenceStates = () => {
    const [experienceState, setExperienceState] = useAtom(experienceStateAtom);

    const setStage = useCallback(
        (stage: ExperienceStage) => {
            setExperienceState({ stage: stage, demoSelection: null, isActive: false });
        },
        [setExperienceState]
    );

    const activateExperienceWithSelection = useCallback(
        (select: DemoSelection) => {
            setExperienceState({ stage: "demo", demoSelection: select, isActive: true });
        },
        [setExperienceState]
    );

    const activateExperience = useCallback(() => {
        setExperienceState({ stage: "diary", demoSelection: null, isActive: true });
    }, [setExperienceState]);

    const stageSwitcher = useCallback(
        <T,>({ diary, demo }: { diary: T; demo: T }): T => {
            return match(experienceState.stage)
                .with("diary", () => diary)
                .with("demo", () => demo)
                .run();
        },
        [experienceState.stage]
    );

    return {
        experienceState,
        stageSwitcher,
        mutator: {
            setStage,
            activateExperienceWithSelection,
            activateExperience,
        },
    };
};
