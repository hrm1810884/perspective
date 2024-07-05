import { style } from "@vanilla-extract/css";
import { vars } from "@/styles";

export const buttonRootStyle = style({
    display: "flex",
    flexBasis: 0,
    flexGrow: 1,
    width: "100%",
    maxWidth: "200px",
    height: "auto",
    aspectRatio: "1 / 1.2",
    background:
        "conic-gradient(from 0deg, #ffffff, #B1B1B1, #ffffff, #B1B1B1,#ffffff, #B1B1B1,#ffffff)",
    color: "#111111",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    position: "relative",
    margin: "1rem 0.5rem",
    transition: "all 0.3s ease",
    filter: "drop-shadow(0 0px 10px rgba(0, 0, 0, 0.1))",
    ":hover": {
        background:
            "conic-gradient(from 90deg, #ffffff, #B1B1B1,#96BDD1, #ffffff, #B1B1B1,#E3ED95,#ffffff, #B1B1B1,#91DCB7,#ffffff,#E2B9E1,#ffffff)",
        transform: "scale(1.1)",
        color: "#111111",
        filter: "drop-shadow(0 0px 10px rgba(0, 0, 0, 0.25))",
    },
});

export const buttonLabelStyle = style({
    fontWeight: "bold",
    fontSize: "2rem",
    transition: "all 0.3s ease",
    ":hover": {
        fontSize: "3rem",
    },
});

export const toolTipStyle = style({
    fontSize : "1rem",
})