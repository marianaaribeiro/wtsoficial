import { CSSProperties } from "react";

const useStyle = () => {
    const containerPage: CSSProperties = {
        backgroundColor: "background.paper",
        flex: "1 1 auto",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
    };

    return {
        containerPage,
    };
};

export default useStyle;
