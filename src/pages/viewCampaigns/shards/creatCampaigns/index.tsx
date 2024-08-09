import { Box } from "@mui/material";
import { Helmet } from "react-helmet";

import LayoutDashboard from "../../../../components/layoutDefault/dashboard";
import CardInformation from "../../../../components/cardInformation";
import useCreatCampaignsHelper from "./creatCampaigns.helper";


const CreatCampaigns = () => {
    const { resources,
        formList,
    } = useCreatCampaignsHelper();

    return (
        <LayoutDashboard>
            <Helmet>
                <title>{resources.title}</title>
            </Helmet>
            <Box
                sx={{
                    ml: 1,
                    mr: 2.5
                }}
            >
                <Box sx={{ flexDirection: "row" }}>
                    <CardInformation
                        title={resources.cardInfo.title}
                        description={resources.cardInfo.description}
                        styleContainer={{
                            m: 2,
                            width: "100%",
                        }}
                    />
                    {formList}

                </Box>
            </Box>
        </LayoutDashboard>
    );
};

export default CreatCampaigns;
