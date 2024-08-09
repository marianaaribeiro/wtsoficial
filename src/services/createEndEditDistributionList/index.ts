
import useApi from "../api";
import getHttp from "../getHttp/getHttp";
import postHttp from "../postHttp/postHttp";

async function postSaveCampaigs(token: string, params: any, API_DIGITAL_URL: string) {
    const { api } = useApi(API_DIGITAL_URL);

    try {
        if (token) {
            const result = await postHttp(api, `api/SaveCampaigs`, params);
            return result;
        }
        else {
            return null;
        }
    } catch (error) { }
}

async function getTemplateEmail(token: string, companyId: string, API_DIGITAL_URL: any) {

    const { api } = useApi(API_DIGITAL_URL);

    try {
        if (token) {
            const result = await getHttp(api, `api/TamplateEmail?CompanyId=${companyId}`);
            return result;
        }
        else {
            return null;
        }
    } catch (error) { }
}

export const createCampaignsServices = {
    postSaveCampaigs,
    getTemplateEmail,
};

