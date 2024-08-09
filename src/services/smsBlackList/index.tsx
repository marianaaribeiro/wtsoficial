
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

async function getSMSBlackList(token: string, params: any, envUrl: string) {
    const { api } = useApi(envUrl);

    try {
        if (token) {
            const result = await postHttp(api, `GetSMSBlackList`, params);
            return result;
        }
        else {
            return null;
        }
    } catch (error) {
        // informationError();
    }
}

async function getSMSBlackListPaged(token: string, params: any, informationError: () => void, envUrl: string) {
    const { api } = useApi(envUrl);

    try {
        if (token) {
            const result = await postHttp(api, `GetSMSBlackListPaged`, params);
            return result;
        }
        else {
            return null;
        }
    } catch (error) {
        informationError();
    }
}

export const smsBlackListManagementServices = {
    getSMSBlackListPaged,
    postPagedGeral,
    getSMSBlackList
};