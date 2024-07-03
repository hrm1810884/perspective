import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles";

export const modalContentStyle = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "start",
    minWidth: "60vw",
});

export const modalBodyStyle = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
});

export const titleStyle = style({
    display: "flex",
    fontSize: vars.fontSizes.xl,
});

export const textStyle = style({
    display: "flex",
    fontSize: vars.fontSizes.lg,
});

export const groupStyle = style({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "10%",
    width: "100%",
    height: "50%",
});

export const buttonContainer = style({
    position: "relative",
    display: "flex",
    width: "454px",
    height: "334px",
});

export const displayButtonStyle = recipe({
    base: {
        position: "absolute",
        borderColor: "black",
        cursor: "pointer",
    },
    variants: {
        isCenter: {
            true: {
                background: "black",
            },
            false: {
                background:
                    "conic-gradient(from 0deg, #ffffff, #B1B1B1, #ffffff, #B1B1B1,#ffffff, #B1B1B1,#ffffff)",
                ":hover": {
                    background:
                        "conic-gradient(from 90deg, #ffffff, #B1B1B1,#96BDD1, #ffffff, #B1B1B1,#E3ED95,#ffffff, #B1B1B1,#91DCB7,#ffffff,#E2B9E1,#ffffff)",
                },
            },
        },
    },
});

export const contentContainer = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: "1rem",
    gap: "1rem 1rem",
});

export const saveButtonStyle = style({
    display: "flex",
    width: "100%",
});
