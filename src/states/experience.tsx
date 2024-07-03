import { atom, useAtom } from "jotai";
import { useCallback } from "react";

import { DemoSelection, ExperienceState } from "@/models";

const defaultExperienceState: ExperienceState = {
    stage: "demo",
    demoSelection: null,
    isActive: false,
};
const experienceStateAtom = atom<ExperienceState>(defaultExperienceState);

export const useExperenceStates = () => {
    const [experienceState, setExperienceState] = useAtom(experienceStateAtom);

    const initializeExperience = useCallback(() => {
        setExperienceState(defaultExperienceState);
    }, [setExperienceState]);

    const selectDemo = useCallback(
        (select: DemoSelection) => {
            setExperienceState({ stage: "demo", demoSelection: select, isActive: false });
        },
        [setExperienceState]
    );

    const activateExperience = useCallback(() => {
        setExperienceState((prev) => ({ ...prev, isActive: true }));
    }, [setExperienceState]);

    const finishExperience = useCallback(() => {
        setExperienceState({ stage: "finish", demoSelection: null, isActive: false });
    }, [setExperienceState]);

    return {
        experienceState,
        mutator: {
            initializeExperience,
            selectDemo,
            activateExperience,
            finishExperience,
        },
    };
};
