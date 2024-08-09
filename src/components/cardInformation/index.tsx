import { Card, CardContent, Typography } from "@mui/material";
import { IProps } from "./IProps";

const CardInformation = ({ title, description, styleTitle, styleDescription, childrens, styleContainer }: IProps) => {
    return (
        <Card variant="outlined">
            <CardContent sx={{ ...styleContainer }}>
                {title && <Typography variant="h5" component="div" sx={{ ...styleTitle }}>
                    {title}
                </Typography>}
                {description && <Typography sx={{ fontSize: 14, ...styleDescription }} color="text.secondary" gutterBottom>
                    {description}
                </Typography>}
                {childrens ?? null}
            </CardContent>
        </Card >
    );
};

export default CardInformation;
