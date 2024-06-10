import { useSockets } from "@/app/providers/socket";
import { guardUndef } from "@/utils/guardUndef";

export const useReceiveService = () => {
    const { socket, socketText: receivedText, setSocketText: setReceivedText } = useSockets();

    const handleConnect = () => {
        console.log("Connected to WebSocket server");
    };

    const handleReceive = (text: string) => {
        setReceivedText(guardUndef(text));
    };

    const setUpSocket = () => {
        socket.on("connect", handleConnect);
        socket.on("receive", handleReceive);
    };

    const shutDownSocket = () => {
        socket.off("connect", handleConnect);
        socket.off("receive", handleReceive);
    };

    return {
        socket,
        receivedText,
        driver: {
            setUpSocket,
            shutDownSocket,
        },
    };
};
