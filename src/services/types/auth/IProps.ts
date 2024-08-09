export type DataAuth = {
	message: string;
	data: {
		access_token: string;
		token_type: string;
		userInfo: DataUserInfo;
	};
	sucess: boolean;
};

export type DataUserInfo = {
	id: number;
	first_name: string;
	email: string;
	email_verified_at: any;
	created_at: string;
	updated_at: string;
	last_name: string;
	photo: string;
	secondary_email: string;
	birthdate: string;
	phone: number;
	vat: number;
	country_id: number;
	password_set_date: string;
	enabled: number;
	created_by: number;
	modified_by: number;
	name: string;
	gender: string;
	position: DataPosition;
	permissions: any;
	isFirstLogin: boolean
};

export type DataPosition = {
	id: number;
	name: DataPositionName;
};

export type DataPositionName = {
	en: string;
	pt_PT: string;
};

export type DataAuthError = {
	message: string;
	errors: {
		additionalProp1: [];
		additionalProp2: [];
		additionalProp3: [];
	};
};

export type AuthMessage = {
	error: boolean;
	title: string;
	message: string;
};

export type DataAuthApiError = {
	message: string;
	errors: DataMessage;
};

export type DataMessage = {
	password: [];
	email: [];
};

export type IDialog = {
	status: boolean;
	data: number | null;
};
