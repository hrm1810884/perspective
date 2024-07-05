import { vars } from "@/styles";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const wrapper = style({
    width: "100vw",
    height: "100vh",
});
export const displayStyle = recipe({
    base: {
        fontSize: vars.fontSizes.xl,
        width: "100%",
        height: "100%",
    },
    variants: {
        id: {
            0: {
                backgroundColor: "black",
                color: "white",
            },
            1: {
                backgroundColor: "orange",
                color: "black",
            },
            2: {
                backgroundColor: "blue",
                color: "white",
            },
            3: {
                backgroundColor: "red",
                color: "black",
            },
        },
        isMutating: {
            true: {
                border: `5px solid rgba(255,255,0,0.7)`,
            },
            false: {
                border: "none",
            },
        },
    },
    defaultVariants: {
        id: 0,
        isMutating: false,
    },
});
