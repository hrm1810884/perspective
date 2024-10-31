import { useCallback, useRef } from "react";

import { MutationStage, SocketMessage } from "@/models";
import { useMutationStates } from "@/states";
import { useSocket } from "@/states/socket";
import { guardUndef } from "@/utils/guardUndef";

export const useReceiveService = () => {
    const { socket } = useSocket();
    const {
        mutator: { lockMutation, updateText },
        mutationState,
    } = useMutationStates();

    const clientStageRef = useRef<MutationStage>("ready");

    const handleConnect = useCallback(() => {
        console.log("Connected to WebSocket server");
    }, []);

    const handleReceive = useCallback(
        (message: SocketMessage) => {
            const { diary: clientDiary, stage: clientStage } = message;
            console.log(`diary ${clientDiary}, stage ${clientStage}`);
            const newDiary = [
                ...mutationState.diary.slice(0, mutationState.mutatedLength),
                ...clientDiary.slice(mutationState.mutatedLength),
            ];
            updateText(newDiary);
            clientStageRef.current = clientStage;
            if (clientStage === "pending") {
                lockMutation();
            }
        },
        [updateText, lockMutation, clientStageRef, mutationState]
    );

    const setUpSocket = useCallback(() => {
        guardUndef(socket).on("connect", handleConnect);
        guardUndef(socket).on("receive", handleReceive);
    }, [socket, handleReceive, handleConnect]);

    const shutDownSocket = useCallback(() => {
        guardUndef(socket).off("connect", handleConnect);
        guardUndef(socket).off("receive", handleReceive);
    }, [socket, handleConnect, handleReceive]);

    return {
        socket,
        clientStageRef,
        driver: {
            setUpSocket,
            shutDownSocket,
        },
    };
};
