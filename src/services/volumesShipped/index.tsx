
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

async function getVolumesShipped(token: string, params: any, envUrl: string) {
    const { api } = useApi(envUrl);

    try {
        if (token) {
            const result = await postHttp(api, `GetVolumesShipped`, params);
            return result;
        }
        else {
            return null;
        }
    } catch (error) {
        // informationError();
    }
}

async function getVolumesShippedPaged(token: string, params: any, informationError: () => void, envUrl: string) {
    const { api } = useApi(envUrl);

    try {
        if (token) {
            const result = await postHttp(api, `GetVolumesShippedPaged`, params);
            return result;
        }
        else {
            return null;
        }
    } catch (error) {
        informationError();
    }
}

export const volumesShippedServices = {
    getVolumesShippedPaged,
    postPagedGeral,
    getVolumesShipped
};

