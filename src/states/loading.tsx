/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
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
        <Args extends unknown[], R>(func: (...args: Args) => Promise<R>) =>
            async (...args: Args): Promise<R> => {
                show();
                try {
                    const res = await func(...args);
                    return res;
                } finally {
                    hide();
                }
            },
        [show, hide]
    );

    return {
        isShown: overlayLoading,
        show,
        hide,
        runWithLoading,
    };
};
