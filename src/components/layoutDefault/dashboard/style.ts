import { styled } from "@mui/material/styles";

const useStyle = () => {
    /*  const SIDE_NAV_WIDTH = 280; */
    const LayoutRoot = styled("div")(() => ({
        display: "flex",
        flex: "1 1 auto",
        maxWidth: "100%",
    /*  [theme.breakpoints.up("lg")]: {
      paddingLeft: SIDE_NAV_WIDTH,
    },  */
    }));

    const LayoutContainer = styled("div")({
        display: "flex",
        flex: "1 1 auto",
        flexDirection: "column",
        width: "100%",
    });
    return {
        LayoutRoot,
        LayoutContainer,
    };
};

export default useStyle;
