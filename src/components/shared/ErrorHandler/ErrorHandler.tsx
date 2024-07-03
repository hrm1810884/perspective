import React, { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { match } from "ts-pattern";

type Props = {
    children: React.ReactNode;
    mainText?: string;
    subText?: string;
};

export const ErrorHandler: FC<Props> = ({ children, mainText, subText }) => {
    return (
        <ErrorBoundary
            fallback={
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                    <h1>
                        {match(mainText)
                            .with(undefined, () => "エラーが発生しました")
                            .otherwise(() => mainText)}
                    </h1>
                    <p>
                        {match(subText)
                            .with(undefined, () => "画面をリロードしてください")
                            .otherwise(() => subText)}
                    </p>
                </div>
            }
        >
            {children}
        </ErrorBoundary>
    );
};
