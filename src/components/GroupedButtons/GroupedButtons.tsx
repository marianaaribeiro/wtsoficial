import { Box, Button, Stack, Typography } from "@mui/material";
import { IProps } from "./IProps";
import useStyle from "./style";

const GroupedButtons = (props: IProps) => {
    const { buttons, buttonStyle, selectedButtons, useFormik, values, errors, touched, disabled, setFieldValue, setSelectedButtons } = props;

    const { buttonStyleDefault } = useStyle();

    const handleClick = (button: any) => {
        if (setSelectedButtons && selectedButtons) {
            if (!selectedButtons.map((x: any) => x.id).includes(button.id)) {
                setSelectedButtons([...selectedButtons, button]);
            } else {
                setSelectedButtons(selectedButtons.filter((x: any) => x.id !== button.id));
            }
        }
    }

    return (
        <>
            {useFormik && values && errors && touched && setFieldValue ?
                <Stack direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={{ lg: 1, md: 3, sm: 1, xs: 1 }}
                    useFlexGap
                    flexWrap="wrap"
                    sx={{ width: "100%" }}>

                    <Box>
                        {buttons.map((button) => (
                            <Button
                                sx={{ m: 1 }}
                                disabled={disabled ?? false}
                                variant={values.buttons.map((x: any) => x.id).includes(button.id) ? 'contained' : 'outlined'}
                                key={button.id} onClick={() => {
                                    if (values.buttons.length > 0 && values.buttons.map((x: any) => x.id).includes(button.id)) {
                                        const newValus = [...values.buttons, button]
                                        setFieldValue("buttons", newValus.filter((x: any) => x.id !== button.id))
                                    } else {
                                        /* const newValus = [...values.buttons, button] */
                                        setFieldValue("buttons", [...values.buttons, button])
                                    }
                                }
                                }>
                                {button.title}
                            </Button>
                        ))}
                        {touched.buttons && errors.buttons && (
                            <Typography style={{ color: 'red', marginTop: 5, fontSize: 14, fontWeight: "400" }}>{errors.buttons}</Typography>
                        )}
                    </Box>
                </Stack>
                :
                <Stack direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={{ lg: 1, md: 3, sm: 1, xs: 1 }}
                    useFlexGap
                    flexWrap="wrap"
                    sx={{ width: "100%" }}>

                    <Box>
                        {buttons.map((button) => (
                            <Button
                                sx={buttonStyle ? buttonStyle : buttonStyleDefault}
                                variant={selectedButtons && selectedButtons.map((x: any) => x.id).includes(button.id) ? 'contained' : 'outlined'}
                                key={button.id} onClick={() => handleClick(button)}>
                                {button.title}
                            </Button>
                        ))}
                    </Box>
                </Stack>
            }</>

    )
}

export default GroupedButtons;

