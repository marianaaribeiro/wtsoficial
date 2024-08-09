import { useEffect, useMemo, useState } from "react";
import { useTranslation } from 'react-i18next'
import { useNavigate } from "react-router-dom";
/* import Cookies from 'js-cookie';
 */
import { useAuth } from "../../hooks/useAuth";
/* import { authenticationService } from "../../services/CBH/authentication.service"; */

const useLoginHelper = () => {
    const auth = useAuth();
    const router = useNavigate();
    const { t } = useTranslation();

    /*  const cookieValue = Cookies.get('AppSessionCookie'); */
    const [loading, setIsLoading] = useState<boolean>(true);
    /* 
        useEffect(() => {
            const handleCBH = async () => {
    
                if (auth?.setInfoUser && auth?.setisLoading && auth?.urlEnviroments) {
                    if (cookieValue) {
                        const currentUser = await authenticationService.getUser(cookieValue, auth?.urlEnviroments.HOST.API_URL_CBH);
                        if (currentUser) {
                            auth?.setInfoUser(currentUser || "");
    
                            try {
                                const response = await authenticationService.getCompany(auth?.urlEnviroments.HOST.API_URL_CBH)
    
                                if (auth?.setCompanyId && response) {
                                    setIsLoading(false);
                                    auth?.setisLoading(false);
                                    auth?.setCompanyId(response)
                                    router("/dashboard");
                                }
                            } catch (error) {
                                setIsLoading(true);
                                auth?.setisLoading(true);
                                router("/login");
                            }
    
                        } else {
                            auth?.setInfoUser(null);
    
                            authenticationService.logout();
                            setIsLoading(false);
                            auth?.setisLoading(false);
                            window.location.href = auth?.urlEnviroments.HOST.WEB_URL_CBH + "auth/login";
                        }
                    } else {
                        window.location.href = auth?.urlEnviroments.HOST.WEB_URL_CBH + "auth/login";
                        setIsLoading(false);
                        auth?.setisLoading(false);
                    }
                } else {
                    if (auth?.urlEnviroments) {
                        window.location.href = auth?.urlEnviroments?.HOST.WEB_URL_CBH + "auth/login";
                        setIsLoading(false);
                        if (auth?.setisLoading) {
                            auth?.setisLoading(false);
                        }
                    }
                }
            }
    
            if (cookieValue) {
                handleCBH();
            }
    
        }, [cookieValue]); */

    useEffect(() => {
        setTimeout(() => {
            router("/langePageWts");
        }, 1000);
    }, [])

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

    return {
        resources,
        auth,
        loading
    };
};

export default useLoginHelper;
