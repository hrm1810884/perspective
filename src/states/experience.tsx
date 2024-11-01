import { atom, useAtom } from "jotai";
import { useCallback } from "react";

import { DemoSelection, ExperienceStage, ExperienceState } from "@/models";

const defaultExperienceState: ExperienceState = {
    stage: "demo",
    demoSelection: null,
};
const experienceStateAtom = atom<ExperienceState>(defaultExperienceState);

export const useExperienceStates = () => {
    const [experienceState, setExperienceState] = useAtom(experienceStateAtom);

    const setStage = useCallback(
        (stage: ExperienceStage) => {
            setExperienceState((prev) => ({
                ...prev,
                stage: stage,
                demoSelection: null,
            }));
        },
        [setExperienceState]
    );

    const selectDemo = useCallback(
        (select: DemoSelection) => {
            setExperienceState({ stage: "demo", demoSelection: select });
        },
        [setExperienceState]
    );

    return {
        experienceState,
        mutator: {
            setStage,
            selectDemo,
        },
    };
};
