import SimpleBar from "simplebar-react";
import { styled } from "@mui/material/styles";
import { CSSProperties } from "react";

const useStyle = () => {
    const Scrollbar = styled(SimpleBar)``;

    const containerScrollbar: CSSProperties = {
        height: "100%",
    };

    const containerBox: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    };

    const gridBox: CSSProperties = {
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        borderRadius: 1,
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
    };

    const boxInfo: CSSProperties = {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
    };
    const boxInfoUser: CSSProperties = {
        display: "inline-flex",
        height: 32,
        width: 32,
        marginBottom: "10px",
    };

    const boxFooter: CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const styleDrawer: CSSProperties = {
        backgroundColor: "neutral.800",
        color: "common.white",
        width: 280,
    };
    return {
        Scrollbar,
        containerScrollbar,
        containerBox,
        gridBox,
        boxInfo,
        boxInfoUser,
        boxFooter,
        styleDrawer,
    };
};

export default useStyle;
