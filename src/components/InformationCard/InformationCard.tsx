import { Box, Stack } from "@mui/material";
import { IProps } from "./IProps";
import useStyle from "./style";

const InformationCard = (props: IProps) => {
    const { title, description, containerStyle, titleStyle, descriptionStyle, children } = props;

    const {
        containerStyleDefault,
        titleStyleDefault,
        descriptionStyleDefault
    } = useStyle();

    return (
        <Stack direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={{ lg: 1, md: 3, sm: 1, xs: 1 }}
            useFlexGap
            flexWrap="wrap"
            sx={{ width: "100%" }}>

            <Box sx={containerStyle ? containerStyle : containerStyleDefault}>
                {title && <Box sx={titleStyle ? titleStyle : titleStyleDefault}>{title}</Box>}
                {description && <Box sx={descriptionStyle ? descriptionStyle : descriptionStyleDefault}>{description}</Box>}
                {children ?? null}
            </Box>
        </Stack>
    )
}

export default InformationCard;