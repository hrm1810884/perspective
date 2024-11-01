/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { FC, useEffect } from "react";

import { ReceiverId } from "@/models";

import { useReceiver } from "./hooks";

import { useMutationStates } from "@/states";
import { useReceiveService } from "@/usecase";
import { AudioValidateModal } from "./components";
import { displayStyle, wrapper } from "./page.css";

type Props = {
    id: ReceiverId;
};
export const ReceiverPage: FC<Props> = ({ id }) => {
    const { mutationState } = useMutationStates();

    const {
        isLoading,
        handler: { handleInputChange },
    } = useReceiver(id);

    const {
        socket,
        driver: { setUpSocket, shutDownSocket },
    } = useReceiveService();

    useEffect(() => {
        handleInputChange();
    }, [mutationState.diary]);

    useEffect(() => {
        setUpSocket();

        return () => {
            shutDownSocket();
        };
    }, [socket, setUpSocket, shutDownSocket]);

    return (
        <div className={wrapper}>
            <AudioValidateModal />
            <div className={displayStyle({ id: id, isMutating: isLoading })}>
                {mutationState.diary}
            </div>
        </div>
    );
};
