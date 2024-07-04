/* eslint-disable no-empty-pattern */
"use client";
import { Button, Group, Modal, Text } from "@mantine/core";
import { FC, useEffect, useState } from "react";

import { useSaveStates } from "@/states/save";
import { stageSwitcher } from "@/utils";

import { FinishSteps, finishSteps } from "./consts";

import { DisplayButtons, Indicator, SaveButtons } from "./components";

import {
    modalBodyStyle,
    modalContentStyle,
    modalHeaderStyle,
    textStyle,
    titleStyle,
} from "./FinishModal.css";

type props = { isOpen: boolean; onClose: () => void };

export const FinishModal: FC<props> = (props) => {
    const { isOpen, onClose: handleClose } = props;
    const [currentStep, setCurrentStep] = useState<FinishSteps>(1);
    const { saveItem } = useSaveStates();

    const handleNextStep = () => {
        const currentIndex = finishSteps.indexOf(currentStep);
        const nextIndex = (currentIndex + 1) % finishSteps.length;
        setCurrentStep(finishSteps[nextIndex]);
    };

    const handleBackStep = () => {
        const currentIndex = finishSteps.indexOf(currentStep);
        const prevIndex = (currentIndex - 1) % finishSteps.length;
        setCurrentStep(finishSteps[prevIndex]);
    };

    useEffect(() => {
        if (isOpen) {
            setCurrentStep(1);
        }
    }, [isOpen]);

    return (
        <Modal
            opened={isOpen}
            onClose={handleClose}
            size="lg"
            title={stageSwitcher(currentStep, {
                1: "どの日記がお好みですか？",
                2: "あなたの入力を保存しても構いませんか？",
            })}
            centered
            classNames={{
                header: modalHeaderStyle,
                content: modalContentStyle,
                body: modalBodyStyle,
                title: titleStyle,
            }}
            style={{ zIndex: 50 }}
            withCloseButton={currentStep === 1}
            closeOnClickOutside={currentStep === 1}
        >
            <Text className={textStyle}>
                {stageSwitcher(currentStep, {
                    1: "4つのディスプレイから選んでください",
                    2: "保存した内容は，許可された用途以外に用いられることはありません．何かご不明点があれば，担当者にお伝えください．",
                })}
            </Text>
            {stageSwitcher(currentStep, { 1: <DisplayButtons />, 2: <SaveButtons /> })}
            <Group mt="md" justify={currentStep === 1 ? "space-between" : "center"}>
                {currentStep === 1 && (
                    <Button onClick={handleBackStep} disabled={true} style={{ opacity: 0 }}>
                        Back
                    </Button>
                )}
                <Indicator currentStep={currentStep} />
                {currentStep === 1 && (
                    <Button onClick={handleNextStep} disabled={saveItem.favoriteId === null}>
                        Next
                    </Button>
                )}
            </Group>
        </Modal>
    );
};
