import { Box } from "@mui/material";
import { IProps } from "./IProps";
import useStyle from "./style";

const ContainerLangePage = ({ imgs, children, sxContainer }: IProps) => {
    const { ContainerGridItem } = useStyle()
    return (
        <Box sx={{
            "& img": {
                maxWidth: "100%",
            },
            backgroundColor: (t) =>
                t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
            background: `url(${imgs})`,
            ...ContainerGridItem,
        }}>
            <Box sx={{ ...sxContainer }}>
                {children ?? null}
            </Box>
        </Box>
    );
};

export default ContainerLangePage;
