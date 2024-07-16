import { useCallback } from "react";

import { SocketMessage } from "@/models";
import { useMutationStates } from "@/states";
import { useSocket } from "@/states/socket";
import { guardUndef } from "@/utils/guardUndef";

export const useReceiveService = () => {
    const { socket } = useSocket();
    const {
        mutator: { lockMutation, updateText },
    } = useMutationStates();

    const handleConnect = useCallback(() => {
        console.log("Connected to WebSocket server");
    }, []);

    const handleReceive = useCallback(
        (message: SocketMessage) => {
            const { diary: clientDiary, stage: clientStage } = message;
            updateText(clientDiary);
            if (clientStage === "pending") {
                lockMutation();
            }
        },
        [updateText, lockMutation]
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
