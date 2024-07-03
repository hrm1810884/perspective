import { LoadingOverlay } from "@mantine/core";
import React, { FC, Suspense } from "react";

type Props = {
    children: React.ReactNode;
};

export const Loader: FC<Props> = ({ children }) => {
    return (
        <Suspense
            fallback={
                <>
                    <LoadingOverlay
                        zIndex={1000}
                        visible
                        overlayProps={{ radius: "lg", blur: 12 }}
                    />
                </>
            }
        >
            {children}
        </Suspense>
    );
};
