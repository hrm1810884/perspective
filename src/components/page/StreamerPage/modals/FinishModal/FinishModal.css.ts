import { style } from "@vanilla-extract/css";

import { vars } from "@/styles";

export const modalHeaderStyle = style({
    display: "flex",
    width: "100%",
});

export const modalContentStyle = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
