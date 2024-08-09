
import { useAuth } from "../../hooks/useAuth";
import useApi from "../api";
import getHttp from "../getHttp/getHttp";
import postHttp from "../postHttp/postHttp";

async function getAllEmail(token: string, companyId: string, informationError: () => void) {
    const auth = useAuth();
    const envUrl = auth?.urlEnviroments ? auth?.urlEnviroments.HOST.API_DIGITAL_URL : "";
    const { api } = useApi(envUrl);

    try {
        if (token) {
            const result = await getHttp(api, `api/GetGeral?companyId=${companyId}`);
            return result;
        }
        else {
            return null;
        }
    } catch (error) {
        informationError();
    }
}

async function postPagedGeral(token: string, params: any, informationError: () => void, envUrl: string) {
    const { api } = useApi(envUrl);

    try {
        if (token) {
            const result = await postHttp(api, `api/GetPagedGeral`, params);
            return result;
        }
        else {
            return null;
        }
    } catch (error) {
        informationError();
    }
}

async function getEmailBlackList(token: string, params: any, informationError: () => void, envUrl: string) {
    const { api } = useApi(envUrl);

    try {
        if (token) {
            const result = await postHttp(api, `GetEmailBlackList`, params);
            return result;
        }
        else {
            return null;
        }
    } catch (error) {
        informationError();
    }
}

async function getEmailBlackListPaged(token: string, params: any, informationError: () => void, envUrl: string) {
    const { api } = useApi(envUrl);

    try {
        if (token) {
            const result = await postHttp(api, `GetEmailBlackListPaged`, params);
            return result;
        }
        else {
            return null;
        }
    } catch (error) {
        informationError();
    }
}

async function getCompany() {
    const auth = useAuth();
    const envUrl = auth?.urlEnviroments ? auth?.urlEnviroments.HOST.API_DIGITAL_URL : "";
    const { api } = useApi(envUrl);

    try {
        const result = await getHttp(api, `api/GetCompany`);
        return result;
    } catch (error) { }
}

export const emailManagementServices = {
    getAllEmail,
    getEmailBlackListPaged,
    getCompany,
    postPagedGeral,
    getEmailBlackList
};

