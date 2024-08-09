import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { IProps } from "./IProps";
import { useAuthContext } from "../../../../../contexts/authContext";

export const AuthGuard = ({ children }: IProps) => {
	const router = useNavigate();
	const data = useAuthContext();

	const [checked, setChecked] = useState(false);

	useEffect(() => {
		if (data?.isAuthenticated === false) {
			router("/login")

			data?.setIsAuthenticated && data?.setIsAuthenticated(true);
			Cookies.set("authenticated", "false");
		} else {
			setChecked(true);
		}
	}, [router]);

	if (!checked) {
		return null;
	}

	return children;
};
