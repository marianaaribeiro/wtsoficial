import { Box } from "@mui/system";
import { Helmet } from "react-helmet";
import LayoutDashboard from "../../components/layoutDefault/dashboard";
import useStyle from "../../styles/style";
import HeaderInformationCard from "../../components/InformationCard/HeaderInformationCard";
import VolumesShipped from "./volumesShipped";
import useVolumesShippedHelper from "./volumesShipped/VolumesShipped.helper";

const BlockLists = () => {
    const { resources } = useVolumesShippedHelper();
    const { containerPage } = useStyle();
    return (
        <LayoutDashboard>
            <Helmet>
                <title>{resources.title}</title>
            </Helmet>
            <Box
                sx={{
                    ...containerPage,
                    justifyContent: 'flex-start',
                }}
            >
                <HeaderInformationCard
                    title= {resources.cardTitle}
                    description= {resources.cardDescription}
                />
                
                <VolumesShipped/>

            </Box>
        </LayoutDashboard>
    );
}

export default BlockLists;