/* eslint-disable no-empty-pattern */
"use client";
import { Button, Group, Modal, Text } from "@mantine/core";
import { FC, useState } from "react";

import { ReceiverId } from "@/models";
import { useExperenceStates } from "@/states";

import { useFinishModal } from "./hooks";

import {
    buttonContainer,
    contentContainer,
    displayButtonStyle,
    groupStyle,
    modalBodyStyle,
    modalContentStyle,
    textStyle,
    titleStyle,
} from "./FinishModal.css";

type props = {};

export const FinishModal: FC<props> = ({}) => {
    const { experienceState } = useExperenceStates();
    const [selectedId, setSelectedId] = useState<ReceiverId | null>(null);
    const [step, setStep] = useState(1);
    const {
        handler: { handleClick, handleClose, handleSave },
    } = useFinishModal();

    const handleNextStep = () => {
        setStep((prevStep) => (prevStep < 2 ? prevStep + 1 : prevStep));
    };

    const handlePrevStep = () => {
        setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
    };

    const buttonList = [
        { id: -1, position: { top: "133.5px", left: "203.5px", width: "85px", height: "143px" } },
        { id: 0, position: { top: "58.5px", left: "309.5px", width: "125px", height: "74px" } },
        { id: 1, position: { top: "0.5px", left: "54.5px", width: "98px", height: "171px" } },
        { id: 2, position: { top: "162.5px", left: "355.5px", width: "98px", height: "171px" } },
        { id: 3, position: { top: "214.5px", left: "0.5px", width: "136px", height: "89px" } },
    ];

    const handleDisplayClick = (regionId: ReceiverId) => {
        setSelectedId(regionId);
    };

    return (
        <Modal
            opened={experienceState.stage === "finish"}
            onClose={() => handleClose()}
            size="lg"
            title={"どの日記がお好みですか？"}
            centered
            withCloseButton={false}
            classNames={{ content: modalContentStyle, body: modalBodyStyle, title: titleStyle }}
            style={{ zIndex: 50 }}
        >
            <Text className={textStyle}>{"4つのディスプレイから選んでください"}</Text>
            {step === 1 ? (
                <Group mt="4rem" classNames={{ root: groupStyle }}>
                    <div className={buttonContainer}>
                        {buttonList.map((info, index) => (
                            <Button
                                key={index}
                                className={displayButtonStyle({ isCenter: info.id === -1 })}
                                style={{
                                    top: info.position.top,
                                    left: info.position.left,
                                    width: info.position.width,
                                    height: info.position.height,
                                }}
                                onClick={() => handleDisplayClick(index as ReceiverId)}
                                disabled={info.id === -1}
                            />
                        ))}
                    </div>
                    <Text>{`${selectedId}`}</Text>
                </Group>
            ) : (
                <div className={contentContainer}>
                    <Button variant="outline" onClick={handleClick}>
                        保存しない
                    </Button>
                    <Button onClick={async () => await handleSave("private")}>
                        保存してもよいが，公開しない
                    </Button>
                    <Button onClick={async () => await handleSave("public")}>
                        保存してもよく，今後の展示で公開しても良い
                    </Button>
                </div>
            )}
            <Group mt="md">
                <div style={{ display: "flex", gap: "8px" }}>
                    <div
                        style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            backgroundColor: step === 1 ? "blue" : "lightgray",
                        }}
                    ></div>
                    <div
                        style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            backgroundColor: step === 2 ? "blue" : "lightgray",
                        }}
                    ></div>
                </div>
            </Group>
            <Group mt="md">
                {step > 1 && <Button onClick={handlePrevStep}>Previous</Button>}
                {step < 2 && <Button onClick={handleNextStep}>Next</Button>}
            </Group>
        </Modal>
    );
};
