/* eslint-disable no-empty-pattern */
"use client";
import { Button, Modal, Text } from "@mantine/core";
import { FC } from "react";

import { useOverlayLoadingState } from "@/states";

import { useEndModal } from "./hooks";

import { OverlayLoading } from "@/components/shared/Loader";

import { contentContainer } from "./EndModal.css";

interface EndModalProps {}

export const EndModal: FC<EndModalProps> = ({}) => {
    const {
        isEndModalOpen,
        handler: { handleClick, handleClose, handleSave },
    } = useEndModal();

    const { runWithLoading } = useOverlayLoadingState();
    return (
        <>
            <OverlayLoading />
            <Modal
                opened={isEndModalOpen}
                onClose={handleClose}
                title="あなたの入力を保存しても構いませんか？"
                centered
            >
                <Text>
                    保存した内容は，許可された用途以外に用いられることはありません．何かご不明点があれば，担当者にお伝えください．
                </Text>
                <div className={contentContainer}>
                    <Button variant="outline" onClick={handleClick}>
                        保存しない
                    </Button>
                    <Button onClick={runWithLoading(async () => await handleSave("private"))}>
                        保存してもよいが，公開しない
                    </Button>
                    <Button onClick={runWithLoading(async () => await handleSave("public"))}>
                        保存してもよく，今後の展示で公開しても良い
                    </Button>
                </div>
            </Modal>
        </>
    );
};
