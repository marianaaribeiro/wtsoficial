import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const useFileUploadHelper = () => {
    const { t } = useTranslation();

    const resources = useMemo(() => {
        return {
            fileToUpload: t("uploadFile.fileToUpload"),
            uploadFileButton: t("uploadFile.uploadFileButton"),
            placeholder: t("uploadFile.placeholder"),
        };
    }, [t]);

    return {
        resources
    }
}

export default useFileUploadHelper;