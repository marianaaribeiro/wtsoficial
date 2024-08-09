import Cookies from "js-cookie";

import useApi from "../api";
import getHttp from "../getHttp/getHttp";/* 
import { useAuth } from "../../hooks/useAuth"; */

async function getUser(token: string, API_URL_CBH: string) {
    /* const auth = useAuth();

    const url: string = auth?.urlEnviroments ? auth.urlEnviroments.HOST.API_URL_CBH : ""
 */
    const { api } = useApi(API_URL_CBH || "");
    try {
        if (token) {
            const result = await getHttp(api, "api/Authentication/user");

            return result;
        }
        else {
            return null;
        }
    } catch (error) { }
}

async function getCompany(API_URL_CBH: string) {

    const { api } = useApi(API_URL_CBH || "");

    try {
        const result = await getHttp(api, `api/Company/GetCompanyByAuth`);
        return result;
    } catch (error) { }
}

function logout() {
    Cookies.remove("AppSessionCookie", { domain: 'example.com', path: '/' })
}

export const authenticationService = {
    getUser,
    logout,
    getCompany
};

