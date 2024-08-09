import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, SelectChangeEvent, Stack, TextField } from "@mui/material";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import { useAuth } from "../../../../hooks/useAuth";
import { viewCampaignsServices } from "../../../../services/viewCampaigns";
import { createCampaignsServices } from "../../../../services/createCampaigns";
import GroupDataEndDataStart from "../../../../components/groupDataEndDataStart";
import GroupedButtons from "../../../../components/GroupedButtons/GroupedButtons";
import { TimePicker } from "@mui/x-date-pickers";
import CustomUploadFile from "../../../../components/customUploadFile";
import InputSelects from "../../../../components/InputSelects";

const useCreatEndEditDistributionListHelper = () => {
    const { t } = useTranslation();
    const router = useNavigate();
    const auth = useAuth();

    const editDistributionList = auth?.editDistributionList ? auth?.editDistributionList : false;

    const nameCampaign = useRef<any>();
    const subject = useRef<any>();

    const [itemValueListSender, setValueListSender] = useState<string>(editDistributionList ? "1" : "0");
    const [listSender, setListSender] = useState<any[]>([]);
    const [listTemplateEmail, setListTemplateEmail] = useState<any[]>([]);
    const [itemValueTemplateEmail, setValueTemplateEmail] = useState<string>(editDistributionList ? "1" : "0");
    const [selectedButtons, setSelectedButtons] = useState<any>([]);
    const [State, setValueState] = useState<any>("0");

    const [valueUpload, setValueUpload] = useState<any>();

    const companyId = auth?.companyId !== undefined ? String(auth?.companyId) : "";
    const typeCampaigns = auth?.typeCreateCampaigns ? auth?.typeCreateCampaigns : "";
    const description = editDistributionList ? "" : ", então preencha todos os campos do formulário";
    const typePage = editDistributionList ? "editar" : "criar";
    const typePageTitle = editDistributionList ? "Editar" : "Criar";

    let cookieValue = Cookies.get('AppSessionCookie') || "";

    const resources = useMemo(() => {
        return {
            title: t("creatDistribution.title"),
            cardInfo: {
                title: t("creatDistribution.cardInfo.title", { typeCampaigns, typePageTitle }),
                description: t("creatDistribution.cardInfo.description", { typeCampaigns, description, typePage }),
            },
            textButton: t("creatDistribution.button"),
            textButtonCancel: t("creatDistribution.buttonCancel"),
            textButtonDelet: t("creatDistribution.buttonDelete"),
        };
    }, [t]);


    const handleOnSubmit = async (values: any, helpers: any) => {
        try {
            const params = {
                sender: itemValueListSender,
                templateEmail: itemValueTemplateEmail,
                body: values.body,
                Subject: values.subject,
                allSend: values.allSend,
                hoursStart: values.hoursStart,
                hoursEnd: values.hoursEnd,
                valueDataStart: values.dataStart,
                valueDataEnd: values.dataEnd,
                selectedButtons: values.buttons,
                nameCampaign: values.nameCampaign
            }

            if (params) { }
            console.log("teste", params)

            /* if (params && auth?.urlEnviroments) {
                const response = await createCampaignsServices.postSaveCampaigs(cookieValue, params, auth?.urlEnviroments.HOST.API_DIGITAL_URL)
                if (response) {
                    router("/view-campaigns")
                }
                router("/view-campaigns")
            } */

        } catch (err: any) {
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: err.message });
            helpers.setSubmitting(false);
        }
    }

    /* CALL APIS */

    const { isLoading: isLoadingSender,
        isRefetching: isRefetchingSender, } = useQuery(
            "AllListSender",
            () => {
                if ((companyId !== undefined || companyId !== "") && auth?.urlEnviroments) {
                    return viewCampaignsServices.getSenderCampaigns(cookieValue, companyId, auth?.urlEnviroments.HOST.API_DIGITAL_URL);
                }
            },
            {
                enabled: false,
                refetchInterval: 0,
                refetchOnWindowFocus: true,
                refetchOnReconnect: false,
                retry: false,
                retryDelay: 1,
                onSuccess: (data) => {
                    if (data) {
                        setListSender(data)
                    }
                },
                onError: () => {
                },
            }
        );

    const { isLoading: isLoadingTemplateEmail,
        isRefetching: isRefetchingTemplateEmail, } = useQuery(
            "AllListTemplate",
            () => {
                if ((companyId !== undefined || companyId !== "") && auth?.urlEnviroments) {
                    return createCampaignsServices.getTemplateEmail(cookieValue, companyId, auth?.urlEnviroments.HOST.API_DIGITAL_URL);
                }
            },
            {
                enabled: false,
                refetchInterval: 0,
                refetchOnWindowFocus: true,
                refetchOnReconnect: false,
                retry: false,
                retryDelay: 1,
                onSuccess: (data) => {
                    if (data) {
                        setListTemplateEmail(data)
                    }
                },
                onError: () => {
                },
            }
        );
    /* FIM */


    const goCancelCreate = () => {
        router("/distribution-list")
    }

    /* multi select List Channel */
    const dataMenuSelectListSender: any[] = listSender?.map((item: any) => {
        return {
            value: `${item.idServico}`,
            context: `${item.nomeSender}`
        }
    }) || [];

    dataMenuSelectListSender.push({
        value: `0`,
        context: `Selecionar`
    })

    /* filter List Sender */
    const handleChangeListSender = (event: SelectChangeEvent) => {
        setValueListSender(event.target.value);
    }

    /* multi select List TemplateEmail */
    const dataMenuSelectTemplateEmail: any[] = listTemplateEmail?.map((item: any) => {
        return {
            value: `${item.idServico}`,
            context: `${item.nomeSender}`
        }
    }) || [];

    dataMenuSelectTemplateEmail.push({
        value: `0`,
        context: `Selecionar`
    })

    /* filter List Channel */
    const handleChangeTemplateEmail = (event: SelectChangeEvent) => {
        setValueTemplateEmail(event.target.value);
    }

    /* list State */
    /* const dataMenuListChannel: any[] = listChannel?.map((item: any) => {
        return {
            value: `${item.idServico}`,
            context: `${item.nameChannel}`
        }
    }) || []; 
    */
    const dataMenuListState: any[] = [
        {
            value: `0`,
            context: `Selecionar`
        },
        {
            value: `1`,
            context: `Ativo`
        },
        {
            value: `2`,
            context: `Inativo`
        }]

    const handleChangeState = (event: SelectChangeEvent) => {
        setValueState(event.target.value);
    }

    /* File Downloader */
    const downloadFile = () => {
        if (valueUpload) {
            // Extrair o nome do arquivo do FormData
            let fileName = 'data.csv'; // Nome padrão caso não haja nome no FormData

            valueUpload.forEach((value: any, key: any) => {
                if (key === 'fileName') {
                    fileName = value;
                }
            });

            // Ler o arquivo CSV do FormData
            const csvFile = valueUpload.get('formFile');
            if (csvFile) {
                const reader = new FileReader();
                reader.onload = (event: any) => {
                    const csvData = event.target.result;

                    // Criar o Blob e o link para download
                    const blob = new Blob([csvData], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);

                    const link = document.createElement('a');
                    link.href = url;
                    link.download = fileName; // Usar o nome do arquivo extraído do FormData
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    // Limpa o URL objeto
                    URL.revokeObjectURL(url);
                };

                // Ler o conteúdo do arquivo CSV
                reader.readAsText(csvFile);
            }
        }

    };

    /*  delete list */
    const goDelete = async () => {
        /* if (auth?.paramsRowTable) {
            try {
                const id = auth?.paramsRowTable
                const response = await ...api
                if (response) {
                    router("/view-campaigns")
                }
            } catch (error: any) {

            }
        }
    } */
    }

    const buttons = [
        {
            id: 1,
            title: "Segunda-Feira"
        },
        {
            id: 2,
            title: "Terça-Feira"
        },
        {
            id: 3,
            title: "Quarta-Feira"
        },
        {
            id: 4,
            title: "Quinta-Feira"
        },
        {
            id: 5,
            title: "Sexta-Feira"
        },
        {
            id: 6,
            title: "Sábado"
        },
        {
            id: 7,
            title: "Domingo"
        },
    ]

    const initialValuesForm = {
        subject: editDistributionList ? "teste" : subject.current ? subject?.current?.value : "",
        body: editDistributionList ? "teste" : "",
        allSend: editDistributionList ? "teste" : "",
        hoursStart: editDistributionList ? "1300" : "",
        hoursEnd: editDistributionList ? "1530" : "",
        nameCampaign: editDistributionList ? "teste" : nameCampaign.current ? nameCampaign?.current?.value : "",
        buttons: [],
        dataStart: null,
        dataEnd: null,
        submit: null,
    }

    const validationSchemaForm = Yup.object({
        subject: Yup.string().required("É necessário preencher esse campo"),
        body: Yup.string().required("É necessário preencher esse campo"),
        allSend: Yup.string().required("É necessário preencher esse campo"),
        hoursStart: Yup.string().required("É necessário preencher esse campo"),
        hoursEnd: Yup.string().required("É necessário preencher esse campo"),
        nameCampaign: Yup.string().required("É necessário preencher esse campo"),
        dataStart: Yup.string().required("É necessário preencher esse campo"),
        dataEnd: Yup.string().required("É necessário preencher esse campo"),
        buttons: Yup.array().min(1, 'Selecione pelo menos um botão').required('Selecione pelo menos um botão')
    });


    const formList = useMemo(() => {
        return (
            <Formik
                initialValues={initialValuesForm}
                validationSchema={validationSchemaForm}
                onSubmit={(values: any, helpers: any) => {
                    handleOnSubmit(values, helpers)
                }}
            >
                {({ touched, errors, handleChange, values, handleBlur, setFieldValue }) => (
                    <Form>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            justifySelf="center"
                            spacing={{ lg: 3, md: 3, sm: 1, xs: 1 }}
                            useFlexGap
                            flexWrap="wrap"
                            sx={{ width: "100%", height: "100%", mb: 3, mt: 4 }}
                        >
                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                justifySelf="center"
                                spacing={{ lg: 3, md: 3, sm: 1, xs: 1 }}
                                useFlexGap
                                flexWrap="wrap"
                                sx={{ width: { lg: "45%", md: "100%" }, height: "100%", mb: 5, gap: "5px" }}
                            >
                                <CustomUploadFile extensionTypes='.txt, .csv' title="Importar" setValueUpload={setValueUpload} />
                                <Button variant="outlined" startIcon={<CloudDownloadIcon />} onClick={downloadFile}>
                                    Baixar Ficheiro
                                </Button>


                            </Stack>

                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                justifySelf="center"
                                spacing={{ lg: 3, md: 3, sm: 1, xs: 1 }}
                                useFlexGap
                                flexWrap="wrap"
                                sx={{ width: { lg: "45%", md: "100%" }, height: "100%", mb: 3 }}
                            >
                                <GroupDataEndDataStart
                                    disabled={isLoadingSender || isRefetchingSender || isLoadingTemplateEmail || isRefetchingTemplateEmail}
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    useFormik={true}
                                    setFieldValue={setFieldValue}
                                />

                                <Field
                                    focused
                                    name="hoursStart"
                                    as={TimePicker}
                                    sx={{ width: "130px" }}
                                    id="outlined-multiline-static-hoursStart"
                                    label="Horário inicial"
                                    multiline
                                    disabled={isLoadingSender || isRefetchingSender || isLoadingTemplateEmail || isRefetchingTemplateEmail}
                                    rows={1}
                                    error={errors.hoursStart}
                                    helperText={errors.hoursStart}
                                    onChange={handleChange}
                                    value={dayjs(values.hoursStart)}
                                    onBlur={handleBlur}

                                />

                                <Field
                                    focused
                                    name="hoursEnd"
                                    as={TimePicker}
                                    sx={{ width: "130px" }}
                                    id="outlined-multiline-static-hoursEnd"
                                    label="Horário Final"
                                    multiline
                                    disabled={isLoadingSender || isRefetchingSender || isLoadingTemplateEmail || isRefetchingTemplateEmail}
                                    rows={1}
                                    error={errors.hoursEnd}
                                    helperText={errors.hoursEnd}
                                    onChange={handleChange}
                                    value={dayjs(values.hoursEnd)}
                                    onBlur={handleBlur}
                                />

                                <GroupedButtons
                                    buttons={buttons}
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    useFormik={true}
                                    setFieldValue={setFieldValue}
                                    disabled={isLoadingSender || isRefetchingSender || isLoadingTemplateEmail || isRefetchingTemplateEmail}
                                />

                                <Field
                                    focused
                                    name="allSend"
                                    as={TextField}
                                    type="text"
                                    sx={{ width: "170px" }}
                                    id="outlined-multiline-static-allSend"
                                    label="Quantidade de envios"
                                    multiline
                                    disabled={isLoadingSender || isRefetchingSender || isLoadingTemplateEmail || isRefetchingTemplateEmail}
                                    rows={1}
                                    error={touched.allSend && !!errors.allSend}
                                    helperText={touched.allSend && errors.allSend}
                                    onChange={handleChange}
                                    value={values.allSend}
                                    onBlur={handleBlur}
                                />
                                {dataMenuListState && (
                                    <InputSelects
                                        title="Definir Estado da lista"
                                        sx={{ minWidth: 150 }}
                                        disabled={isLoadingSender || isRefetchingSender || isLoadingTemplateEmail || isRefetchingTemplateEmail}
                                        label="status"
                                        valueSelect={State}
                                        handleChangeLanguage={handleChangeState}
                                        menuItem={dataMenuListState}
                                    />
                                )}
                            </Stack>
                        </Stack>

                        <Box sx={{ mt: 5, mb: 5, display: "inline-flex", justifyContent: "flex-end", width: "100%", gap: "20px" }}>
                            <Button variant="contained" type="submit">{resources.textButton}</Button>
                            {auth?.editDistributionList && <Button variant="outlined" color="error" type="button" onClick={goDelete} >{resources.textButtonDelet}</Button>}
                            <Button variant="contained" type="button" color="error" onClick={goCancelCreate}>{resources.textButtonCancel}</Button>
                        </Box>
                    </Form>
                )}
            </Formik>

        )
    }, [isLoadingSender, isLoadingTemplateEmail, isRefetchingTemplateEmail, isRefetchingSender, selectedButtons, buttons, setSelectedButtons]);


    return {
        resources,
        formList,
        itemValueListSender,
        isLoadingSender,
        isRefetchingSender,
        dataMenuSelectListSender,
        isLoadingTemplateEmail,
        isRefetchingTemplateEmail,
        dataMenuSelectTemplateEmail,
        itemValueTemplateEmail,
        selectedButtons,
        buttons,
        initialValuesForm,
        validationSchemaForm,
        valueUpload,
        handleOnSubmit,
        goCancelCreate,
        setSelectedButtons,
        handleChangeTemplateEmail,
        handleChangeListSender
    };
};

export default useCreatEndEditDistributionListHelper;
