
import useApi from "../api";
import postHttp from "../postHttp/postHttp";

async function getCompanyConfiguration(token: string, params: any, API_DIGITAL_URL: string) {
    const { api } = useApi(API_DIGITAL_URL);

    try {
        if (token) {
            const result = await postHttp(api, '/GetCompanyConfigurations', params);
            return result;
        }
        else {
            return null;
        }
    } catch (error) { }
}

async function setCompanyConfiguration(token: string, params: any, API_DIGITAL_URL: string) {
    const { api } = useApi(API_DIGITAL_URL);

    try {
        if (token) {
            const result = await postHttp(api, '/SetCompanyConfigurations', params)
            return result;
        }
        else {
            return null;
        }
    } catch (error) { }
}

export const rulesPageServices = {
    getCompanyConfiguration,
    setCompanyConfiguration
};