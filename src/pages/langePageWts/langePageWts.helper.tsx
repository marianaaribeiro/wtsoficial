import { useEffect, useMemo, useState } from "react";
import { useTranslation } from 'react-i18next'
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { Box } from "@mui/system";
import { Button, Stack, Typography } from "@mui/material";
/* import Cookies from 'js-cookie';
 */
import { useAuth } from "../../hooks/useAuth";
/* import { authenticationService } from "../../services/CBH/authentication.service"; */

const useLangePageWtsHelper = () => {
    const auth = useAuth();
    const router = useNavigate();
    const { t } = useTranslation();

    const [loading, setIsLoading] = useState<boolean>(true);

    const resources = useMemo(() => {
        return {
            title: t("login.page"),
            loading: t("loading"),
            email: t("login.form.email"),
            password: t("login.form.pass"),
            validationEmail: t("login.validation.email"),
            validationPass: t("login.validation.password"),
            required: t("login.required"),

            text: t("login.button"),
            recover: t("login.recover.Password"),
            item: [
                {
                    title: t("login.error.item[0].title"),
                },
                {
                    title: t("login.error.item[1].title"),
                },
                {
                    title: t("login.error.item[2].title"),
                },
                {
                    title: t("login.error.item[3].title"),
                },
            ],
            itemError: [
                {
                    title: t("errors.card[0].error.title"),
                    description: t("errors.card[0].error.description"),
                },
            ],
        };
    }, [t]);

    let LIST = auth?.urlEnviroments?.LIST_BACKGOURD_IMG_PAGE !== undefined ? auth?.urlEnviroments?.LIST_BACKGOURD_IMG_PAGE : [];
    const listImg = useMemo(() => {
        if (LIST && LIST.length > 0) {
            return LIST
        }
    }, [LIST])

    const selectLayoutPage = (value: number) => {
        switch (value) {
            case 1:
                return (
                    <Box sx={{ pt: 40 }}>
                        <Typography variant="h3" gutterBottom>
                            {resources.loading}
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            {resources.loading}
                        </Typography>
                        <Button variant="contained" color="info">{resources.loading}</Button>
                    </Box>
                )
            case 2:
                return (
                    <Box sx={{ pt: 70 }}>
                        <Typography variant="h5" color="blue" gutterBottom>
                            {resources.loading}
                        </Typography>
                        <Typography variant="h3" gutterBottom>
                            {resources.loading}
                        </Typography>
                        <Typography variant="subtitle1" color="gray" gutterBottom>
                            subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                            blanditiis tenetur
                        </Typography>

                        <Stack direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            justifySelf="center"
                            spacing={{ lg: 1, md: 3, sm: 1, xs: 1 }}
                            useFlexGap
                            flexWrap="wrap"
                            sx={{ width: "100%", height: "100%", mt: 6 }}>
                            <Box sx={{ display: "inline-flex" }}>
                                <CheckCircleIcon sx={{ mr: 1 }} color="success" />
                                <Typography variant="h5" color="black" gutterBottom>
                                    {resources.loading}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "inline-flex" }}>
                                <CheckCircleIcon sx={{ mr: 1 }} color="success" />
                                <Typography variant="h5" color="black" gutterBottom>
                                    {resources.loading}
                                </Typography>
                            </Box>

                        </Stack>
                    </Box>
                )
            case 3:
                return (
                    <Box sx={{ pt: 7, width: "100%", pl: 100, display: "inline-flex", justifyContent: "flex-end", flexDirection: "column" }}>
                        <Typography variant="h5" color="blue" gutterBottom>
                            {resources.loading}
                        </Typography>
                        <Typography variant="h3" gutterBottom>
                            {resources.loading}
                        </Typography>
                        <Stack direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            justifySelf="center"
                            spacing={{ lg: 1, md: 3, sm: 1, xs: 1 }}
                            useFlexGap
                            flexWrap="wrap"
                            sx={{ width: "100%", height: "100%", mt: 6 }}>
                            <Box sx={{ pt: 5, width: 250 }}>
                                <Box sx={{ display: "inline-flex" }}>
                                    <FactCheckIcon sx={{ mr: 1 }} color="success" />
                                    <Typography variant="h5" color="black" gutterBottom>
                                        {resources.loading}
                                    </Typography>
                                </Box>
                                <Typography variant="subtitle1" color="gray" gutterBottom>
                                    subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                                    blanditiis tenetur
                                </Typography>
                            </Box>
                            <Box sx={{ pt: 5, width: 250 }}>
                                <Box sx={{ display: "inline-flex" }}>
                                    <FactCheckIcon sx={{ mr: 1 }} color="success" />
                                    <Typography variant="h5" color="black" gutterBottom>
                                        {resources.loading}
                                    </Typography>
                                </Box>
                                <Typography variant="subtitle1" color="gray" gutterBottom>
                                    subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                                    blanditiis tenetur
                                </Typography>
                            </Box>
                            <Box sx={{ pt: 5, width: 250 }}>
                                <Box sx={{ display: "inline-flex" }}>
                                    <FactCheckIcon sx={{ mr: 1 }} color="success" />
                                    <Typography variant="h5" color="black" gutterBottom>
                                        {resources.loading}
                                    </Typography>
                                </Box>
                                <Typography variant="subtitle1" color="gray" gutterBottom>
                                    subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                                    blanditiis tenetur
                                </Typography>
                            </Box>
                            <Box sx={{ pt: 5, width: 250 }}>
                                <Box sx={{ display: "inline-flex" }}>
                                    <FactCheckIcon sx={{ mr: 1 }} color="success" />
                                    <Typography variant="h5" color="black" gutterBottom>
                                        {resources.loading}
                                    </Typography>
                                </Box>
                                <Typography variant="subtitle1" color="gray" gutterBottom>
                                    subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                                    blanditiis tenetur
                                </Typography>
                            </Box>

                        </Stack>
                    </Box>
                )
            case 4:
                return (
                    <Box sx={{ pt: 7, width: "100%", pl: 120, display: "inline-flex", justifyContent: "flex-end", flexDirection: "column" }}>
                        <Typography variant="h3" gutterBottom>
                            {resources.loading}
                        </Typography>
                        <Typography variant="subtitle1" color="gray" gutterBottom>
                            subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                            blanditiis tenetur
                        </Typography>
                        <Stack direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            justifySelf="center"
                            spacing={{ lg: 1, md: 3, sm: 1, xs: 1 }}
                            useFlexGap
                            flexWrap="wrap"
                            sx={{ width: "100%", height: "100%", mt: 3 }}>
                            <Box sx={{ pt: 5 }}>
                                <Box sx={{ display: "inline-flex" }}>
                                    <FactCheckIcon sx={{ mr: 1 }} color="success" />
                                    <Typography variant="h5" color="black" gutterBottom>
                                        {resources.loading}
                                    </Typography>
                                </Box>
                                <Typography variant="subtitle1" color="gray" gutterBottom>
                                    subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                                    blanditiis tenetur
                                </Typography>
                            </Box>
                            <Box sx={{ pt: 5 }}>
                                <Box sx={{ display: "inline-flex" }}>
                                    <FactCheckIcon sx={{ mr: 1 }} color="success" />
                                    <Typography variant="h5" color="black" gutterBottom>
                                        {resources.loading}
                                    </Typography>
                                </Box>
                                <Typography variant="subtitle1" color="gray" gutterBottom>
                                    subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                                    blanditiis tenetur
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                )

            default:
                <Typography variant="h3" gutterBottom>
                    {resources.loading}
                </Typography>
                break;
        }
    }

    return {
        resources,
        auth,
        loading,
        listImg,
        selectLayoutPage
    };
};

export default useLangePageWtsHelper;
