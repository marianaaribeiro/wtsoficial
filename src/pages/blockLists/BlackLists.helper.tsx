import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const useBlackListsHelper = () => {
    const { t } = useTranslation();

    const resources = useMemo(() => {
        return {
            cardTitle: t("blacklists.cardInfo.title"),
            cardDescription: t("blacklists.cardInfo.description"),
            title: t("blacklists.sms.title"),
        };
    }, [t]);

    return {
        resources
    }
}

export default useBlackListsHelper;