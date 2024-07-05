import { style } from "@vanilla-extract/css";

import { vars } from "@/styles";

export const wrapper = style({
    display: "flex",
    flexDirection: "column",
    width: "100vw",
    height: "100vh",
});

export const textAreaRootStyle = style({
    display: "flex",
    width: "100vw",
    flexGrow: 1,
    
});

export const textAreaInputStyle = style({
    display: "flex",
    width: "100vw",
    height: "100%",
    fontSize: "4rem",
});

export const controlAreaStyle = style({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100vw",
    height: "fit-content",
    minHeight: "50px",
});

export const buttonStyle = style({
    display: "flex",
    fontSize: vars.fontSizes.xl,
    minHeight: "100%",
});
