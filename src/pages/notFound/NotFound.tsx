
import { Box, Container, Typography } from "@mui/material";
import { Helmet } from "react-helmet";

import useStyle from "../../styles/404/style";
import imgs from "../../assets/error404.png";
import LayoutPageSimple from "../../components/layoutDefault/pageSimple";

const NotFound = () => {
    const {
        containerBox,
        containerImg,
        containerItem,
        imgItem,
    } = useStyle()

    return (
        <LayoutPageSimple>
            <Helmet>
                <title>404 | Gestor de Email</title>
            </Helmet>
            <Box
                component="main"
                sx={{
                    ...containerBox,
                }}
            >
                <Container maxWidth="md">
                    <Box
                        sx={{
                            ...containerItem,
                        }}
                    >
                        <Box
                            sx={{
                                mb: 3,
                                ...containerImg,
                            }}
                        >
                            <img
                                alt="Page notfound"
                                src={`${imgs}`}
                                style={{
                                    ...imgItem,
                                }}
                            />
                        </Box>
                        <Typography align="center" sx={{ mb: 3 }} variant="h4">
              404 - Página não encontrada
                        </Typography>
                        {/* <Button
              component={Link}
              href="/login"
              startIcon={
                <SvgIcon fontSize="small">
                  <ArrowLeftIcon />
                </SvgIcon>
              }
              sx={{ mt: 3 }}
              variant="contained"
            >
              Voltar
            </Button> */}
                    </Box>
                </Container>
            </Box>
        </LayoutPageSimple>
    );
};

export default NotFound;
