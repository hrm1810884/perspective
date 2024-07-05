import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/styles";
export const wrapper = recipe({
    base: {
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        width: "100vw",
        height: "100vh",
    },
    variants: {
        id: {
            0: {
                backgroundColor: "black",
                color: vars.colors.white,
                fontSize: "4rem",
            },
            1: {
                backgroundColor: "orange",
                color:"black", // "white
                fontSize: "4rem",
            },
            2: {
                backgroundColor:"blue",
                color:"white",
                fontSize: "4rem",
            },
            3: {
                backgroundColor: "red",
                fontSize: "4rem",
                color:"black"
            },
            4: {
                backgroundColor: vars.colors.white,
                fontSize: vars.fontSizes.xs,
            },
        },
    },
    defaultVariants: {
        id: 0,
    },
});