import { CSSProperties } from "react";

const useStyle = () => {
    const containerPage: CSSProperties = {
        backgroundColor: "background.paper",
        flex: "1 1 auto",
        alignItems: "center",
        display: "inline-flex",
        justifyContent: "center",
        height: "100%",
        flexDirection: "column",
        gap: "15px"
    };

    const containerGrid: CSSProperties = {
        maxWidth: 550,
        width: "100%",
    };

    const containerInfo: CSSProperties = {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "5px",
    };

    const containerImg: CSSProperties = {
        margin: "50px 44px",
        width: "400px",
        paddingBottom: "15px",
        paddingTop: "35px",
        borderRadius: "30px"
    };

    const containerLogin: CSSProperties = {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "2px",
    };

    const containerLink: CSSProperties = {
        alignItems: "flex-end",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "4px",
    };

    const containerComponentOne: CSSProperties = {
        alignItems: "flex-start",
        display: "inline-flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
        color: "black",
    };
    return {
        containerLink,
        containerLogin,
        containerImg,
        containerInfo,
        containerGrid,
        containerPage,
        containerComponentOne
    };
};

export default useStyle;
