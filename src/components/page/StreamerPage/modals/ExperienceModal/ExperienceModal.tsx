/* eslint-disable no-empty-pattern */
"use client";
import { Group, Modal, Text } from "@mantine/core";
import { IconApple, IconBook, IconBrush, IconPencil } from "@tabler/icons-react";
import React, { FC, useEffect } from "react";

import { DemoSelection, demoSelectionList } from "@/models";
import { useExperenceStates } from "@/states";
import { stageSwitcher } from "@/utils";

import { useModal } from "../hooks";

import { PrismaButton } from "@/components/shared";

import {
    groupStyle,
    modalBodyStyle,
    modalContentStyle,
    textStyle,
    titleStyle,
} from "./ExperienceModal.css";

export const ExperienceModal: FC<{}> = ({}) => {
    const {
        experienceState,
        mutator: { selectDemo },
    } = useExperenceStates();

    const iconMap: Record<DemoSelection["key"], React.ElementType> = {
        apple: IconApple,
        book: IconBook,
        brush: IconBrush,
        pencil: IconPencil,
    };

    const {
        isOpen,
        mutator: { openModal, closeModal },
    } = useModal();

    useEffect(() => {
        if (!experienceState.demoSelection) {
            openModal();
        }
    }, [experienceState, openModal]);

    return (
        <Modal
            opened={isOpen}
            onClose={() => {}}
            size="lg"
            title={stageSwitcher(experienceState.stage, {
                demo: "はじめにデモを見ていただけます",
                diary: "実際に体験してみましょう",
            })}
            centered
            withCloseButton={false}
            classNames={{
                content: modalContentStyle,
                body: modalBodyStyle,
                title: titleStyle,
            }}
            style={{ zIndex: 50 }}
        >
            <Text className={textStyle}>
                {stageSwitcher(experienceState.stage, {
                    demo: "以下の4種類から選択してください",
                    diary: "ボタンをクリックしてください",
                })}
            </Text>
            <Group mt="4rem" classNames={{ root: groupStyle }}>
                {stageSwitcher(experienceState.stage, {
                    demo: (
                        <>
                            {demoSelectionList.map((selection) => {
                                return (
                                    <PrismaButton
                                        label={selection.label}
                                        key={selection.key}
                                        onClick={() => {
                                            closeModal();
                                            selectDemo(selection);
                                        }}
                                        IconComponent={iconMap[selection.key]}
                                    />
                                );
                            })}
                        </>
                    ),
                    diary: (
                        <PrismaButton
                            label={"diary"}
                            onClick={closeModal}
                            IconComponent={IconPencil}
                        />
                    ),
                })}
            </Group>
        </Modal>
    );
};
