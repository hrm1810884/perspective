/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

import { ReceiverId } from "@/models";
import { useReceiveService } from "@/usecase";

import { useReceiver } from "./hooks";

import { useMutationStates } from "@/states";
import { AudioValidateModal } from "./components";
import { displayStyle, wrapper } from "./page.css";

export const ReceiverPage = () => {
    const params = useParams();
    const id = parseInt(params.id[0], 10) as ReceiverId;

    const { mutationState } = useMutationStates();

    const {
        clientTextRef,
        handler: { handleInputChange },
    } = useReceiver(id);

    const {
        socket,
        receivedText,
        driver: { setUpSocket, shutDownSocket },
    } = useReceiveService(clientTextRef);

    useEffect(() => {
        handleInputChange();
    }, [receivedText]);

    useEffect(() => {
        setUpSocket();

        return () => {
            shutDownSocket();
        };
    }, [socket, setUpSocket, shutDownSocket]);

    return (
        <div className={wrapper}>
            <AudioValidateModal />
            <>{console.log(mutationState.stage)}</>
            <div
                className={displayStyle({ id: id, isMutating: mutationState.stage === "pending" })}
            >
                {receivedText}
            </div>
        </div>
    );
};
