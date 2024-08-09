import { Box } from "@mui/system";
import { Helmet } from "react-helmet";
import LayoutDashboard from "../../components/layoutDefault/dashboard";
import useStyle from "../../styles/style";
import HeaderInformationCard from "../../components/InformationCard/HeaderInformationCard";
import EmailCard from "./Email/EmailCard";
import SMSCard from "./SMS/SMSCard";
import useBlackListsHelper from "./BlackLists.helper";

const BlockLists = () => {
    const { resources } = useBlackListsHelper()
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

                <EmailCard />
                <SMSCard />

            </Box>
        </LayoutDashboard>
    );
}

export default BlockLists;