import { useTranslation } from "react-i18next";

const useCustomDialogHelper = () => {
	const { t } = useTranslation("common");

	/* const handleAction = () => {
		isModal(false);
			if(status === 401){
				router.push("/login");
			} 
	}; */

	return {
		t
	};
};

export default useCustomDialogHelper;
