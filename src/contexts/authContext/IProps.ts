import { ReactNode } from "react";

export interface IProps {
	children: ReactNode;
}

export interface IContexts {
	children?: ReactNode;
	isLoading?: boolean;
	user?: IUsers;
	token?: string;
	expirationDate?: string,
	baseApi?: string;
	listTheme?: string;
	isAuthenticated?: boolean;
	openDiolog?: any;
	locales?: string;
	companyId?: string;
	infoUser?: IUsers | undefined | null;
	isOpenLoading?: boolean;
	urlEnviroments?: IConfigs;
	valueEnviroment?: any;
	editCampaigns?: boolean;
	typeCreateCampaigns?: any;
	paramsRowTable?: any;
	editDistributionList?: any,
	setEditDistributionList?: (value: any) => void;
	setParamsRowTable?: (value: any) => void;
	setTypeCreateCampaigns?: (value: any) => void;
	setEditCampaigns?: (value: boolean) => void;
	setCompanyId?: (value: any) => void;
	setisLoading?: (value: boolean) => void;
	setInfoUser?: (e: any | undefined | null) => void;
	signIn?: (infoUser: any, urls: string) => void;
	signUp?: (email: string, name: string, password: number) => void;
	signOut?: () => void;
	setIsAuthenticated?: (value: boolean) => void;
	recoverPasswordUser?: (
		email: string,
		infoUser: any
	) => void;
	getErrorApi?: (value: any) => void;
	setOpenDiolog?: (value: any) => void;
}

export interface IInitialState {
	listTheme?: string;
	locales: string;
}

export interface IUsers {
	id: string,
	guidValue: string,
	username: string,
	email: string,
	role: string,
	companyName: string
}

export interface IConfigs {
	HOST: {
		API_DIGITAL_URL: string,
		API_URL_CBH: string,
		WEB_URL_CBH: string,
	},
	VERSION: string,
	LIST_BACKGOURD_IMG_PAGE: ListImg[]
}

export interface ListImg {
	IMG: string,
	TYPE_LAYOUT: number
	HEIGHT: any
}

