import { recipe } from "@vanilla-extract/recipes";
export const indicatorStyle = recipe({
    base: {
        display: "flex",
        width: "2rem",
        height: "2rem",
        borderRadius: "50%",
    },
    variants: {
        isActive: {
            true: {
                border: "1px solid black",
                background:
                    "conic-gradient(from 90deg, #ffffff, #B1B1B1,#96BDD1, #ffffff, #B1B1B1,#E3ED95,#ffffff, #B1B1B1,#91DCB7,#ffffff,#E2B9E1,#ffffff)",
            },
            false: {
                background:
                    "conic-gradient(from 0deg, #ffffff, #B1B1B1, #ffffff, #B1B1B1,#ffffff, #B1B1B1,#ffffff)",
                opacity: 0.5,
            },
        },
    },
});
