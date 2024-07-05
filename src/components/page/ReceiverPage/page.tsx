/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

import { ReceiverId } from "@/models";
import { useReceiveService } from "@/usecase";

import { useReceiver } from "./hooks";

import { AudioValidateModal } from "./components";
import { wrapper } from "./page.css";

export const ReceiverPage = () => {
    const params = useParams();
    const id = parseInt(params.id[0], 10) as ReceiverId;

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
        <div className={wrapper({id:id})}>
            <AudioValidateModal />
            <div >{receivedText}</div>
        </div>
    );
};
