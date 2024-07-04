import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

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
    },
    variants: {
        isCenter: {
            true: {
                cursor: "auto",
                background: "black",
            },
            false: {
                cursor: "pointer",
                background:
                    "conic-gradient(from 0deg, #ffffff, #B1B1B1, #ffffff, #B1B1B1,#ffffff, #B1B1B1,#ffffff)",
                ":hover": {
                    background:
                        "conic-gradient(from 90deg, #ffffff, #B1B1B1,#96BDD1, #ffffff, #B1B1B1,#E3ED95,#ffffff, #B1B1B1,#91DCB7,#ffffff,#E2B9E1,#ffffff)",
                },
            },
        },
        isSelected: {
            true: {
                borderWidth: "3px",
            },
            false: {
                borderWidth: "1px",
            },
        },
    },
});
