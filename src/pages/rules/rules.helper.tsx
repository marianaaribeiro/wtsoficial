import { useFormik } from "formik";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const useRulesHelper = (handleSubmit: () => void) => {

    const { t } = useTranslation();

    const resources = useMemo(() => {
        return {
            title: t("companyRules.title"),
            cardTitle: t("companyRules.cardInfo.title"),
            cardDescription: t("companyRules.cardInfo.description"),
            generalTitle : t("companyRules.table.item[0]"),
            maxMessagesAllowedPerMonth : t("companyRules.table.item[1]"),
            emailTitle : t("companyRules.table.item[2]"),
            maxEmailsAllowedPerMonth : t("companyRules.table.item[3]"),
            maxEmailsAllowedPerDay : t("companyRules.table.item[4]"),
            useEmailRandom : t("companyRules.table.item[5]"),
            emailRandomIntervalBegin : t("companyRules.table.item[6]"),
            emailRandomIntervalEnd : t("companyRules.table.item[7]"),
            smstitle: t("companyRules.table.item[8]"),
            maxSmssAllowedPerMonth : t("companyRules.table.item[9]"),
            maxSmssAllowedPerDay : t("companyRules.table.item[10]"),
            useSmsRandom : t("companyRules.table.item[11]"),
            smsIntervalBegin : t("companyRules.table.item[12]"),
            smsIntervalEnd : t("companyRules.table.item[13]"),
            errorMessage: t("companyRules.table.errorMessage"),
            buttonSave: t("companyRules.buttonSave"),
            disclaimer: t("companyRules.disclaimer")
        };
    }, [t]);

    
    const validationSchema = Yup.object({
        maxEmailsAllowedPerMonth: Yup.number().required(resources.errorMessage),
        maxEmailsAllowedPerDay: Yup.number().required(resources.errorMessage),
        emailRandomIntervalBegin: Yup.number().required(resources.errorMessage),
        emailRandomIntervalEnd: Yup.number().required(resources.errorMessage),
        maxSmssAllowedPerMonth: Yup.number().required(resources.errorMessage),
        maxSmssAllowedPerDay: Yup.number().required(resources.errorMessage),
        smsIntervalBegin: Yup.number().required(resources.errorMessage),
        smsIntervalEnd: Yup.number().required(resources.errorMessage),
    });

    const formik = useFormik({
        initialValues: {
            id: 0,
            companyId: 0,
            maxMessagesAllowedPerMonth: 0,
            maxEmailsAllowedPerMonth: 0,
            maxEmailsAllowedPerDay: 0,
            useEmailRandom: 0,
            emailRandomIntervalBegin: 0,
            emailRandomIntervalEnd: 0,
            maxSmssAllowedPerMonth: 0,
            maxSmssAllowedPerDay: 0,
            useSmsRandom: 0,
            smsIntervalBegin: 0,
            smsIntervalEnd: 0,
            languageCode: "pt"
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: () => {
            handleSubmit()
        },
    });

    return {
        formik,
        resources
    };
};

export default useRulesHelper;
