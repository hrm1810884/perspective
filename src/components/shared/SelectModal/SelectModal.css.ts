import { style } from "@vanilla-extract/css";

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
