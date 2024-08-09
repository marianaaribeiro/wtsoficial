import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
} from "react";
import Cookies from "js-cookie";

import { IContexts } from "./IProps";
import { IDialog } from "../../services/types/auth/IProps";
/* import { authenticationService } from "../../services/CBH/authentication.service"; */
import { reducer } from "./reducer";
import { HANDLERS, initialState } from "./types";


export const AuthContext = createContext<IContexts | null>(null);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: IContexts) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const initialized = useRef(false);

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [baseApi, setBaseApi] = useState("");
    const [openDiolog, setOpenDiolog] = useState<IDialog>({
        status: false,
        data: null,
    });
    const [infoUser, setInfoUser] = useState<any>();
    const [isOpenLoading, setisLoading] = useState<boolean>(true);
    const [companyId, setCompanyId] = useState<any>();
    const [urlEnviroments, setUrlEnviroments] = useState<any>();
    const [editCampaigns, setEditCampaigns] = useState<boolean>(false);
    const [editDistributionList, setEditDistributionList] = useState<boolean>(false);
    const [typeCreateCampaigns, setTypeCreateCampaigns] = useState<any>();
    const [paramsRowTable, setParamsRowTable] = useState<any>();

    const valueEnviroment = null

    const initialize = async () => {
        if (initialized.current) {
            return;
        }

        initialized.current = true;

        const isAuth = Cookies.get("authenticated")

        const infoBases: any = JSON.parse(
            Cookies.get("infoBase") || "null"
        );

        const decode = decodeURIComponent(infoBases);
        setBaseApi(decode || "");

        if (isAuth === "true") {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }

        const list = {
            listTheme: "",
            locales: "pt",
        }

        dispatch({
            type: HANDLERS.INITIALIZE,
            payload: list,
        });
    };

    useEffect(
        () => {
            initialize();
        }, []);

    useEffect(
        () => {

            if (companyId) {
                dispatch({
                    type: HANDLERS.COMPANYID,
                    payload: companyId,
                });
            }
        }, [companyId]);

    useEffect(() => {
        fetch('./config.json')
            .then(response => response.json())
            .then((data: any) => {
                setUrlEnviroments(data);
            })
            .catch(error => {
                console.error('Error fetching config:', error);
            });
    }, []);


    const signIn = async (infoLogin: any, urls: string) => {
        setBaseApi(urls || "");

        Cookies.set("authenticated", "true");
        Cookies.set("infoLoginUser", `${JSON.stringify(infoLogin)}`);

        /* const encoded = encodeURIComponent(urls);
        Cookies.set("infoBase", `${JSON.stringify(encoded)}`); */

        setIsAuthenticated(true);

        /* dispatch({
            type: HANDLERS.SIGN_IN,
            payload: params,
        }); */
    };

    const signOut = () => {
        /* dispatch({
            type: HANDLERS.SIGN_OUT,
        }); */

        Cookies.set("authenticatedToken", "null");
        Cookies.set("authenticated", "false");

        /*  authenticationService.logout()
         window.location.href = urlEnviroments?.HOST.WEB_URL_CBH + "auth/login"; */
        setIsAuthenticated(false);
    };

    const getErrorApi = (value: any) => {
        if (value !== 200) {
            setOpenDiolog({ status: true, data: value });
        } else {
            setOpenDiolog({ status: false, data: null });
        }
    };

    const providerValue = useMemo(() => ({
        ...state,
        baseApi,
        isAuthenticated,
        openDiolog,
        companyId,
        infoUser,
        isOpenLoading,
        valueEnviroment,
        urlEnviroments,
        editCampaigns,
        typeCreateCampaigns,
        paramsRowTable,
        editDistributionList,
        setEditDistributionList,
        setParamsRowTable,
        setTypeCreateCampaigns,
        setEditCampaigns,
        setisLoading,
        setInfoUser,
        signIn,
        signOut,
        setIsAuthenticated,
        getErrorApi,
        setOpenDiolog,
        setCompanyId,
    }), [
        state,
        baseApi,
        isAuthenticated,
        openDiolog,
        companyId,
        infoUser,
        isOpenLoading,
        valueEnviroment,
        urlEnviroments,
        editCampaigns,
        typeCreateCampaigns,
        paramsRowTable,
        setParamsRowTable,
        setTypeCreateCampaigns,
        setEditCampaigns,
        setisLoading,
        setInfoUser,
        signIn,
        signOut,
        setIsAuthenticated,
        getErrorApi,
        setOpenDiolog,
        setCompanyId,
    ]);

    return (
        <AuthContext.Provider
            value={providerValue}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext: () => IContexts | null = () =>
    useContext(AuthContext);
