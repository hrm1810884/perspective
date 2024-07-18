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
        handler: { handleUnSave, handleSave },
    } = useSave();
    return (
        <div className={contentContainer}>
            <Button
                variant="outline"
                onClick={async () => {
                    handleNext();
                    await handleUnSave();
                }}
                size="md"
            >
                保存しない
            </Button>
            <Button
                onClick={async () => {
                    handleNext();
                    await handleSave("private");
                }}
                size="md"
            >
                保存してもよいが，公開しない
            </Button>
            <Button
                color="green"
                onClick={async () => {
                    handleNext();
                    await handleSave("public");
                }}
                size="md"
            >
                保存してもよく，今後の展示で公開しても良い
            </Button>
        </div>
    );
};
