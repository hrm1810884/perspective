/* eslint-disable no-empty-pattern */
"use client";
import { Group, Modal, Text } from "@mantine/core";
import { IconApple, IconBook, IconBrush, IconPencil } from "@tabler/icons-react";
import React, { FC } from "react";

import { DemoSelection, demoSelectionList } from "@/models";
import { useExperenceStates } from "@/states";

import { PrismaButton } from "@/components/shared";

import {
    groupStyle,
    modalBodyStyle,
    modalContentStyle,
    textStyle,
    titleStyle,
} from "./ExperienceModal.css";

type props = {};

export const ExperienceModal: FC<props> = ({}) => {
    const {
        experienceState,
        stageSwitcher,
        mutator: { activateExperience, activateExperienceWithSelection },
    } = useExperenceStates();

    const iconMap: Record<DemoSelection["key"], React.ElementType> = {
        apple: IconApple,
        book: IconBook,
        brush: IconBrush,
        pencil: IconPencil,
    };

    return (
        <Modal
            opened={
                (experienceState.stage === "demo" || experienceState.stage === "diary") &&
                !experienceState.isActive
            }
            onClose={() => {}}
            size="lg"
            title={stageSwitcher({
                diary: "実際に体験してみましょう",
                demo: "はじめにデモを見ていただけます",
            })}
            centered
            withCloseButton={false}
            classNames={{ content: modalContentStyle, body: modalBodyStyle, title: titleStyle }}
            style={{ zIndex: 50 }}
        >
            <Text className={textStyle}>
                {stageSwitcher({
                    diary: "ボタンをクリックしてください",
                    demo: "以下の4種類から選択してください",
                })}
            </Text>
            <Group mt="4rem" classNames={{ root: groupStyle }}>
                {stageSwitcher({
                    diary: (
                        <PrismaButton
                            label={"diary"}
                            onClick={activateExperience}
                            IconComponent={IconPencil}
                        />
                    ),
                    demo: (
                        <>
                            {demoSelectionList.map((selection) => {
                                return (
                                    <PrismaButton
                                        label={selection.label}
                                        key={selection.key}
                                        onClick={() => activateExperienceWithSelection(selection)}
                                        IconComponent={iconMap[selection.key]}
                                    />
                                );
                            })}
                        </>
                    ),
                })}
            </Group>
        </Modal>
    );
};
