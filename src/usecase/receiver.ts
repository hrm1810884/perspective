import { useCallback } from "react";

import { SocketMessage } from "@/models";
import { useMutationStates } from "@/states";
import { useSocket } from "@/states/socket";
import { guardUndef } from "@/utils/guardUndef";

export const useReceiveService = () => {
    const { socket } = useSocket();
    const {
        mutator: { updateText },
        mutationState,
    } = useMutationStates();

    const handleConnect = useCallback(() => {
        console.log("Connected to WebSocket server");
    }, []);

    const handleReceive = useCallback(
        (message: SocketMessage) => {
            const { diary: clientDiary } = message;
            console.log(`diary ${clientDiary}`);
            const newDiary =
                mutationState.diary.slice(0, mutationState.mutatedLength) +
                clientDiary.slice(message.mutatedLength);
            updateText(newDiary);
        },
        [updateText, mutationState]
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
        driver: {
            setUpSocket,
            shutDownSocket,
        },
    };
};
