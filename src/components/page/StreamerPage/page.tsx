/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button, Textarea } from "@mantine/core";
import { useCallback, useEffect } from "react";
import { match } from "ts-pattern";

import { experienceDataList } from "@/models";
import { useExperenceStates, useTypingSound } from "@/states";

import { demoInput } from "./consts";
import { useStreamer } from "./hooks";

import { DemoModal, EndModal, StartModal } from "./components";

import {
    buttonStyle,
    controlAreaStyle,
    textAreaInputStyle,
    textAreaRootStyle,
    wrapper,
} from "./page.css";

export const StreamerPage = () => {
    const {
        textareaRef,
        clientText,
        updateText,
        handler: { handleInputChange, handleReset },
    } = useStreamer();

    const {
        handler: { handleShortTypingSound, handleTypingText },
    } = useTypingSound();

    const { experienceState, diaryHandler, demoHandler } = useExperenceStates();

    const handleEndButtonClick = useCallback(() => {
        match(experienceState.mode)
            .with("Diary", () => {
                diaryHandler.handleFinish();
            })
            .with("Demo", () => {
                demoHandler.handleInit();
            });
    }, [experienceState, diaryHandler, demoHandler]);

    const handleBackButtonClick = useCallback(() => {
        demoHandler.handleSelectDemo();
    }, [demoHandler]);

    useEffect(() => {
        if (experienceState.stage !== "finish") {
            handleReset(); //finishの時は保存するのでresetしない
        }
        if (experienceState.mode === "Demo" && experienceState.selection) {
            const demoText = demoInput[experienceState.selection.key];
            handleTypingText(demoText);
        }
    }, [experienceState, updateText]);

    useEffect(() => {
        if (experienceState.mode === "Demo" && experienceState.selection) {
            handleShortTypingSound();
            handleInputChange(clientText);
        }
    }, [clientText, experienceState]);

    return (
        <div className={wrapper}>
            <StartModal />
            <DemoModal />
            <EndModal />
            <Textarea
                classNames={{ root: textAreaRootStyle, input: textAreaInputStyle }}
                value={clientText}
                onChange={(e) => {
                    handleShortTypingSound();
                    handleInputChange(e.target.value);
                }}
                placeholder="Write message"
                ref={textareaRef}
                disabled={experienceState.mode === "Demo"}
            />

            <div className={controlAreaStyle}>
                {experienceState.mode !== null && (
                    <Button onClick={handleEndButtonClick} className={buttonStyle}>
                        {`${experienceDataList.find((item) => item.mode === experienceState.mode)?.label}を終了する`}
                    </Button>
                )}
                {experienceState.mode === "Demo" && (
                    <Button onClick={handleBackButtonClick} className={buttonStyle}>
                        他のデモを見る
                    </Button>
                )}
            </div>
        </div>
    );
};
