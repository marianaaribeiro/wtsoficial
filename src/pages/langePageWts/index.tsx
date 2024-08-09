import {
    Box,
    Button,
    Typography,
} from "@mui/material";
import { Helmet } from "react-helmet";

import useLangePageWtsHelper from "./langePageWts.helper";
import useStyle from "./style";
import LayoutPageSimple from "../../components/layoutDefault/pageSimple";
import ContainerLangePage from "../../components/containerLangePage";
import { ListImg } from "../../contexts/authContext/IProps";

const LangePageWts = () => {
    const {
        resources,
        loading,
        listImg,
        selectLayoutPage
    } = useLangePageWtsHelper();
    const {
        containerPage,
        containerComponentOne
    } = useStyle();

    return (
        <LayoutPageSimple>
            <Helmet>
                <title>{resources.title}</title>
            </Helmet>
            <Box
                sx={{
                    ...containerPage
                }}
            >
                {/* {(loading) && <LoadingCustom />} */}
                {listImg && listImg.map((item: ListImg) => (
                    <ContainerLangePage
                        imgs={item.IMG}
                        sxContainer={{
                            mx: 10,
                            height: item.HEIGHT,
                            alignItems: "center",
                            ...containerComponentOne
                        }}
                        children={<></>}
                    />
                ))}

            </Box>
        </LayoutPageSimple>
    );
};


export default LangePageWts;
