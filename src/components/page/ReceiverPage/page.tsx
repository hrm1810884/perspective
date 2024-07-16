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
        handler: { handleInputChange, handleStateChange },
    } = useReceiver(id);

    const {
        socket,
        clientStageRef,
        driver: { setUpSocket, shutDownSocket },
    } = useReceiveService();

    useEffect(() => {
        handleInputChange();
    }, [mutationState.diary]);

    useEffect(() => {
        console.log(clientStageRef.current);
        if (mutationState.stage === "pending" && clientStageRef.current === "ready") {
            console.log("fetch AI diary");
            handleStateChange();
        }
    }, [clientStageRef.current]);

    useEffect(() => {
        setUpSocket();

        return () => {
            shutDownSocket();
        };
    }, [socket, setUpSocket, shutDownSocket]);

    return (
        <div className={wrapper}>
            <AudioValidateModal />
            <div
                className={displayStyle({ id: id, isMutating: mutationState.stage === "pending" })}
            >
                {mutationState.diary}
            </div>
        </div>
    );
};
