"use client";
import { Button, Tooltip } from "@mantine/core";
import { ElementType, FC, Key } from "react";

import "@/app/globals.css";
import "@mantine/core/styles.css";
import { buttonLabelStyle, buttonRootStyle } from "./PrismaButton.css";

type props = {
    label: string;
    keyValue?: Key;
    onClick: () => void;
    IconComponent: ElementType;
};

export const PrismaButton: FC<props> = (props) => {
    const { label, keyValue, onClick, IconComponent } = props;
    return (
        <Tooltip label={label} key={keyValue} style={{fontSize:"1.5rem"}}>
            <Button
                onClick={onClick}
                classNames={{
                    root: buttonRootStyle,
                    label: buttonLabelStyle,
                }}
            >
                <IconComponent style={{ width: "auto", height: "20%" }} />
            </Button>
        </Tooltip>
    );
};