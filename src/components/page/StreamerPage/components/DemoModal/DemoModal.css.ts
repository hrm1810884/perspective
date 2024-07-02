import { style } from "@vanilla-extract/css";

import { vars } from "@/styles";

export const titleStyle = style({
    fontSize: vars.fontSizes.xl,
});

export const textStyle = style({
    fontSize: vars.fontSizes.lg,
});

export const groupStyle = style({
    width: "80%",
    height: "50%",
    justifyContent: "center",
});
