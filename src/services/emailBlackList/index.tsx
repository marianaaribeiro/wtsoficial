
import postHttp from "../postHttp/postHttp";
import useApi from "../api";

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

async function getEmailBlackList(token: string, params: any, envUrl: string) {
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
        // informationError();
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

export const emailBlackListManagementServices = {
    getEmailBlackListPaged,
    postPagedGeral,
    getEmailBlackList
};

