
import useApi from "../api";
import getHttp from "../getHttp/getHttp";
import postHttp from "../postHttp/postHttp";

async function postPagedGeral(token: string, params: any, API_DIGITAL_URL: string) {
    const { api } = useApi(API_DIGITAL_URL);

    try {
        if (token) {
            const result = await postHttp(api, `api/GetPagedGeral`, params);
            return result;
        }
        else {
            return null;
        }
    } catch (error) { }
}

async function getState(token: string, companyId: string, API_DIGITAL_URL: any) {

    const { api } = useApi(API_DIGITAL_URL);

    try {
        if (token) {
            const result = await getHttp(api, `api/GetState?CompanyId=${companyId}`);
            return result;
        }
        else {
            return null;
        }
    } catch (error) { }
}



export const viewDistributionListServices = {
    postPagedGeral,
    getState,
};

