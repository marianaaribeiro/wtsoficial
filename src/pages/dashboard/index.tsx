import { Box, Stack } from "@mui/material";
import { Helmet } from "react-helmet";

import useDashboardHelper from "./dashboard.helper";
import useStyle from "./style";
import LayoutDashboard from "../../components/layoutDefault/dashboard";
/* import InformationCard from "../../components/InformationCard/InformationCard";
import { padding } from "@mui/system"; */
import CardInformation from "../../components/cardInformation";

const Dashboard = () => {
    const { resources } = useDashboardHelper()
    const { containerPage } = useStyle();
    return (
        <LayoutDashboard>
            <Helmet>
                <title>{resources.title}</title>
            </Helmet>
            <Box
                sx={{
                    ...containerPage,
                }}
            >

                <Stack direction="row"
                    justifyContent="center"
                    alignItems="center"
                    justifySelf="center"
                    spacing={{ lg: 1, md: 3, sm: 1, xs: 1 }}
                    useFlexGap
                    flexWrap="wrap"
                    sx={{ width: "100%", height: "100%", mt: 30 }}>
                    <CardInformation
                        title={resources.cardInfo.title}
                        description={resources.cardInfo.description}
                        styleContainer={{
                            m: 5,

                        }}
                    />
                </Stack>
            </Box>
        </LayoutDashboard>
    );
};

export default Dashboard;
