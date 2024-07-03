/* eslint-disable no-empty-pattern */
"use client";
import { Modal, Text } from "@mantine/core";
import { FC, ReactNode } from "react";

import {
    textStyle,
    titleStyle,
} from "@/components/page/StreamerPage/components/StartModal/StartModal.css";

import { modalBodyStyle, modalContentStyle } from "./SelectModal.css";

type props = {
    isOpen: boolean;
    mainText: string;
    subText: string;
    onClose?: () => void;
    children: ReactNode;
};

export const SelectModal: FC<props> = (props) => {
    const { isOpen, mainText, subText, onClose, children } = props;

    return (
        <Modal
            opened={isOpen}
            onClose={onClose || (() => {})}
            size="lg"
            title={mainText}
            centered
            withCloseButton={!!onClose}
            classNames={{ content: modalContentStyle, body: modalBodyStyle, title: titleStyle }}
            style={{ zIndex: 50 }}
        >
            <Text className={textStyle}>{subText}</Text>
            {children}
        </Modal>
    );
};
