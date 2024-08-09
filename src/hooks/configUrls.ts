/* import { useEffect, useState } from "react";
import { loginServices } from "../services/Login/login";
import configProject from "../../public/configs.json" */

const useConfigUrlsHook = (urls: any) => {

    /* const [enviromentUrl, setEnviromentUrl] = useState()

    useEffect(() => {

        loginServices.urlsEnviroment().then(item => {
            if (item) {
                setEnviromentUrl(item)
            }
            return item
        })
    }, [])

    const urls = enviromentUrl ? enviromentUrl : configProject?.list; */

    const API_EMAIL_Url =
        process.env.NODE_ENV === "development"
            ? `${urls?.host?.development?.API_EMAIL_Url}`
            : `${urls?.host?.API_EMAIL_Url}`;

    const API_URL_CBH =
        process.env.NODE_ENV === "development"
            ? `${urls?.host?.development?.API_URL_CBH}`
            : `${urls?.host?.API_URL_CBH}`;

    const WEB_URL_CBH =
        process.env.NODE_ENV === "development"
            ? `${urls?.host?.development?.WEB_URL_CBH}`
            : `${urls?.host?.WEB_URL_CBH}`;

    const version = `${urls?.version}`

    return {
        API_EMAIL_Url,
        API_URL_CBH,
        WEB_URL_CBH,
        version
    };
};

export default useConfigUrlsHook;
