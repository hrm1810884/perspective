import { atom, useAtom } from "jotai";

import { ReceiverText, StreamerText } from "@/models";

const clientTextAtom = atom<StreamerText>("");
const receivedTextAtom = atom<ReceiverText>([]);
export const useDiary = () => {
    const [clientText, setClientText] = useAtom<StreamerText>(clientTextAtom);
    const [receivedText, setReceivedText] = useAtom<ReceiverText>(receivedTextAtom);

    return {
        client: { clientText, setClientText },
        receiver: {
            receivedText,
            setReceivedText,
        },
    };
};
