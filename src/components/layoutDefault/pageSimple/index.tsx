import { ThemeProvider } from "@mui/material/styles";

import useStyle from "./style";
import { Box, Unstable_Grid2 as Grid } from "@mui/material";
import { IProps } from "./IProps";
import usePageSimple from "./pageSimple.helper";

const LayoutPageSimple = ({ children }: IProps) => {
  const {
    boxContainer,
    gridContainer,
    gridItem,
  } = useStyle()
  const { theme } = usePageSimple();
  return (
    <ThemeProvider theme={theme}>
      <Box component="main" sx={boxContainer}>
        <Grid container sx={gridContainer}>
          <Grid xs={12} lg={12} sx={gridItem}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default LayoutPageSimple;
