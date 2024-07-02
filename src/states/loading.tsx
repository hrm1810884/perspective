import { atom, useAtom } from "jotai";
import { useCallback } from "react";

const overlayLoadingAtom = atom<boolean>(false);

export const useOverlayLoadingState = () => {
    const [overlayLoading, setOverlayLoading] = useAtom(overlayLoadingAtom);

    const show = useCallback(() => {
        setOverlayLoading(true);
    }, [setOverlayLoading]);

    const hide = useCallback(() => {
        setOverlayLoading(false);
    }, [setOverlayLoading]);

    const runWithLoading = useCallback(
        (func: () => Promise<unknown>) => async () => {
            console.log("hoge");
            show();
            try {
                await func();
            } finally {
                hide();
            }
        },
        [show, hide]
    );

    return {
        isShown: overlayLoading,
        runWithLoading,
    };
};
