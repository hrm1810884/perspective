/* eslint-disable no-empty-pattern */
import { Button } from "@mantine/core";
import { FC } from "react";

import { useSave } from "./hooks";

import { contentContainer } from "./SaveButtons.css";

type props = {
    onNext: () => void;
};

export const SaveButtons: FC<props> = ({ onNext: handleNext }) => {
    const {
        handler: { handleClick, handleSave },
    } = useSave();
    return (
        <div className={contentContainer}>
            <Button
                variant="outline"
                onClick={() => {
                    handleNext();
                    handleClick();
                }}
            >
                保存しない
            </Button>
            <Button
                onClick={async () => {
                    handleNext();
                    await handleSave("private");
                }}
            >
                保存してもよいが，公開しない
            </Button>
            <Button
                onClick={async () => {
                    handleNext();
                    await handleSave("public");
                }}
            >
                保存してもよく，今後の展示で公開しても良い
            </Button>
        </div>
    );
};
