import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, SelectChangeEvent, Stack, TextField } from "@mui/material";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import dayjs from "dayjs";

import { useAuth } from "../../../../hooks/useAuth";
import { viewCampaignsServices } from "../../../../services/viewCampaigns";
import { createCampaignsServices } from "../../../../services/createCampaigns";
import InputSelects from "../../../../components/InputSelects";
import GroupDataEndDataStart from "../../../../components/groupDataEndDataStart";
import GroupedButtons from "../../../../components/GroupedButtons/GroupedButtons";
import { TimePicker } from "@mui/x-date-pickers";

const useCreatCampaignsHelper = () => {
	const { t } = useTranslation();
	const router = useNavigate();
	const auth = useAuth();

	const editCampaigns = auth?.editCampaigns ? auth?.editCampaigns : false;

	const nameCampaign = useRef<any>();
	const subject = useRef<any>();

	const [itemValueListSender, setValueListSender] = useState<string>(editCampaigns ? "1" : "0");
	const [listSender, setListSender] = useState<any[]>([]);
	const [listTemplateEmail, setListTemplateEmail] = useState<any[]>([]);
	const [itemValueTemplateEmail, setValueTemplateEmail] = useState<string>(editCampaigns ? "1" : "0");
	const [selectedButtons, setSelectedButtons] = useState<any>([]);

	const companyId = auth?.companyId !== undefined ? String(auth?.companyId) : "";
	const typeCampaigns = auth?.typeCreateCampaigns ? auth?.typeCreateCampaigns : "";
	const description = editCampaigns ? "" : ", então preencha todos os campos do formulário";
	const typePage = editCampaigns ? "editar" : "criar";
	const typePageTitle = editCampaigns ? "Editar" : "Criar";

	let cookieValue = Cookies.get('AppSessionCookie') || "";

	const resources = useMemo(() => {
		return {
			title: t("creatCampaigns.title"),
			cardInfo: {
				title: t("creatCampaigns.cardInfo.title", { typeCampaigns, typePageTitle }),
				description: t("creatCampaigns.cardInfo.description", { typeCampaigns, description, typePage }),
			},
			textButton: t("creatCampaigns.button"),
			textButtonCancel: t("creatCampaigns.buttonCancel"),
			textButtonDelet: t("creatCampaigns.buttonDelete"),
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
		router("/view-campaigns")
	}

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

	/* date end date start*/
	/* const handleOnchangeDateEnd = (end: any, setFieldValue: (e: any, x: any) => void) => {
		const dates = new Date(String(end)).toLocaleDateString('en', {
			month: '2-digit',
			day: '2-digit',
			year: "numeric",
		})
		const formatValue = dates.split("/")
		const value = formatValue[2] + "-" + formatValue[0] + "-" + formatValue[1]
		
		setValueDataEnd({
			formart: value,
			noFormart: end,
			error: null
		});
		
		setFieldValue("dataEnd", value)
	}
		
	const handleOnchangeDateStart = (start: any, setFieldValue: (e: any, x: any) => void) => {
		const dates = new Date(String(start)).toLocaleDateString('en', {
			month: '2-digit',
			day: '2-digit',
			year: "numeric",
		})
		const formatValue = dates.split("/")
		const value = formatValue[2] + "-" + formatValue[0] + "-" + formatValue[1]
		
		setValueDataStart({
			formart: value,
			noFormart: start,
			error: null
		});
		
		setFieldValue("dataStart", value)
	} */


	/* const handleClick = (button: any) => {
		if (!selectedButtons.map((x: any) => x.id).includes(button.id)) {
			setSelectedButtons([...selectedButtons, button]);
		} else {
			setSelectedButtons(selectedButtons.filter((x: any) => x.id !== button.id));
		}
		
	} */

	const initialValuesForm = {
		subject: editCampaigns ? "teste" : subject.current ? subject?.current?.value : "",
		body: editCampaigns ? "teste" : "",
		allSend: editCampaigns ? "teste" : "",
		hoursStart: editCampaigns ? "1300" : "",
		hoursEnd: editCampaigns ? "1530" : "",
		nameCampaign: editCampaigns ? "teste" : nameCampaign.current ? nameCampaign?.current?.value : "",
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
							sx={{ width: "100%", height: "100%", mb: 3, mt: 3 }}
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
								<Field
									focused
									name="nameCampaign"
									as={TextField}
									sx={{ width: "100%" }}
									fullWidth
									id="outlined-multiline-static-nameCampaign"
									label="Nome da Campanha"
									multiline
									disabled={isLoadingSender || isRefetchingSender || isLoadingTemplateEmail || isRefetchingTemplateEmail}
									rows={1}
									error={touched.nameCampaign && !!errors.nameCampaign}
									helperText={touched.nameCampaign && errors.nameCampaign}
									onChange={handleChange}
									value={values.nameCampaign}
									onBlur={handleBlur}
								/>

								{dataMenuSelectListSender && (
									<InputSelects
										title="Remetente"
										sx={{ minWidth: 79 }}
										disabled={isLoadingSender || isRefetchingSender}
										label="sender"
										valueSelect={itemValueListSender}
										handleChangeLanguage={handleChangeListSender}
										menuItem={dataMenuSelectListSender}
									/>
								)}

								{dataMenuSelectTemplateEmail && (
									<InputSelects
										title={`Template ${typeCampaigns}`}
										sx={{ minWidth: 100 }}
										disabled={isLoadingTemplateEmail || isRefetchingTemplateEmail}
										label="template"
										valueSelect={itemValueTemplateEmail}
										handleChangeLanguage={handleChangeTemplateEmail}
										menuItem={dataMenuSelectTemplateEmail}
									/>
								)}

								{typeCampaigns !== "SMS" && <Field
									focused
									name="subject"
									as={TextField}
									fullWidth
									sx={{ width: "100%" }}
									id="outlined-multiline-static-subject"
									label="Assunto do E-amil"
									multiline
									type="text"
									disabled={isLoadingSender || isRefetchingSender || isLoadingTemplateEmail || isRefetchingTemplateEmail}
									rows={1}
									error={touched.subject && !!errors.subject}
									helperText={touched.subject && errors.subject}
									onChange={handleChange}
									value={values.subject}
									onBlur={handleBlur}
								/>}

								<Field
									focused
									name="body"
									as={TextField}
									type="text"
									sx={{ width: "100%" }}
									fullWidth
									id="outlined-multiline-static-body"
									label={`Descrição ${typeCampaigns}`}
									multiline
									disabled={isLoadingSender || isRefetchingSender || isLoadingTemplateEmail || isRefetchingTemplateEmail}
									rows={4}
									error={touched.body && !!errors.body}
									helperText={touched.body && errors.body}
									onChange={handleChange}
									value={values.body}
									onBlur={handleBlur}
								/>
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
							</Stack>
						</Stack>

						<Box sx={{ mt: 5, mb: 5, display: "inline-flex", justifyContent: "flex-end", width: "100%", gap: "20px" }}>
							<Button variant="contained" type="submit">{resources.textButton}</Button>
							{auth?.editCampaigns && <Button variant="outlined" color="error" type="button" onClick={goDelete}>{resources.textButtonDelet}</Button>}
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
		handleOnSubmit,
		goCancelCreate,
		/* handleOnchangeDateEnd,
		handleOnchangeDateStart, */
		setSelectedButtons,
		handleChangeTemplateEmail,
		handleChangeListSender
	};
};

export default useCreatCampaignsHelper;
