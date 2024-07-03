/* eslint-disable no-empty-pattern */
import { Button, Modal } from "@mantine/core";
import { IconVolume } from "@tabler/icons-react";
import { FC } from "react";

import { useTyping } from "@/states";

import { buttonStyle, clickMeStyle, modalStyle } from "./AudioValidateModal.css";

type props = {};

export const AudioValidateModal: FC<props> = ({}) => {
    const {
        isAudioContextAllowed,
        mutator: { allowAudioContext },
    } = useTyping();

    return (
        <Modal
            opened={!isAudioContextAllowed}
            onClose={allowAudioContext}
            title="音声を有効化してください"
            centered
            withCloseButton={false}
            closeOnClickOutside={false}
            classNames={{ body: modalStyle }}
        >
            <Button
                variant="outline"
                classNames={{ root: buttonStyle, inner: clickMeStyle }}
                onClick={allowAudioContext}
                rightSection={<IconVolume />}
            >
                Click Me!!
            </Button>
        </Modal>
    );
};
