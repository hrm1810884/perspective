import { style } from "@vanilla-extract/css";

import { vars } from "@/styles";

export const modalStyle = style({
    display: "flex",
    justifyContent: "center",
});

export const buttonStyle = style({
    display: "flex",
    alignItems: "center",
    margin: "5px",
    padding: "15px",
});

export const clickMeStyle = style({
    fontSize: vars.fontSizes.lg,
    height: "auto",
});
