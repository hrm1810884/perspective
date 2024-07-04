import { style } from "@vanilla-extract/css";

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
    justifyContent: "center",
    width: "100%",
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
    justifyContent: "center",
    gap: "10%",
    width: "100%",
    height: "50%",
});
