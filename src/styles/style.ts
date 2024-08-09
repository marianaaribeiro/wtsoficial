import { CSSProperties } from "react";

const useStyle = () => {
    const containerPage: CSSProperties = {
        backgroundColor: "background.paper",
        flex: "1 1 auto",
        alignItems: "center",
        display: "inline-flex",
        justifyContent: "center",
        paddingBottom: "40px",
        height: "100vh",
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

    return {
        containerLink,
        containerLogin,
        containerImg,
        containerInfo,
        containerGrid,
        containerPage,
    };
};

export default useStyle;
