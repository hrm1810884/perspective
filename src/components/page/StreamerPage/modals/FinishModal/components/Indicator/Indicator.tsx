import { Group } from "@mantine/core";
import { FC } from "react";

import { finishSteps } from "../../consts";

import { indicatorStyle } from "./Indicator.css";

type props = { currentStep: number };

export const Indicator: FC<props> = ({ currentStep }) => {
    return (
        <Group mt="md" style={{ justifyContent: "center" }}>
            {finishSteps.map((step) => (
                <div key={step} className={indicatorStyle({ isActive: step === currentStep })} />
            ))}
        </Group>
    );
};
