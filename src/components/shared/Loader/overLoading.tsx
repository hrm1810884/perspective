import { LoadingOverlay } from "@mantine/core";
import { FC } from "react";

import { useOverlayLoadingState } from "@/states";

export const OverlayLoading: FC = () => {
    const { isShown } = useOverlayLoadingState();

    return (
        <LoadingOverlay
            zIndex={1000}
            visible={isShown}
            overlayProps={{ radius: "lg", blur: 20, opacity: 1 }}
            loaderProps={{ type: "dots" }}
        />
    );
};
