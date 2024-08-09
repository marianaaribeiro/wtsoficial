import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const useCustomModalHelper = (openModal: boolean, handleClose: () => void) => {
	const { t } = useTranslation();
	const router = useNavigate();

	const handleAction = () => {
		handleClose()
		if (openModal === true) {
			router("/login");
		}
	};

	return {
		t,
		handleAction
	};
};

export default useCustomModalHelper;
