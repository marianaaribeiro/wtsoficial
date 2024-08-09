import { Box } from "@mui/system";
import { Helmet } from "react-helmet";
import LayoutDashboard from "../../components/layoutDefault/dashboard";
import useStyle from "../../styles/style";
import HeaderInformationCard from "../../components/InformationCard/HeaderInformationCard";
import InformationCard from "../../components/InformationCard/InformationCard";
import { Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { ReactNode, useEffect, useMemo, useState } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import Cookies from "js-cookie";
import useRulesHelper from "./rules.helper";
import { useAuth } from "../../hooks/useAuth";
import { rulesPageServices } from "../../services/rules";

const Rules = () => {
    const { containerPage } = useStyle();
    const auth = useAuth();
    const envUrl = auth?.urlEnviroments ? auth?.urlEnviroments.HOST.API_DIGITAL_URL : "";
    const companyId = auth?.companyId !== undefined ? String(auth?.companyId) : "";
    const [render, setRender] = useState(false);
    const token = Cookies.get('AppSessionCookie') || "";

    const handleSubmit = async () => {
        if (formik.isValid) {
            setRender(true)
            await rulesPageServices.setCompanyConfiguration(token, formik.values, envUrl);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await rulesPageServices.getCompanyConfiguration(token, {companyId: companyId}, envUrl);
    
                if(result) {
                    formik.setValues(result)
                    setRender(true)
                } else {
                    setRender(false)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData()        
    }, [])

    const { formik, resources } = useRulesHelper(handleSubmit);

    function createData(
        name: string,
        value: ReactNode | null,
    ) {
        return { name, value };
    }

    const rows = [
        createData(resources.generalTitle, null),
        createData(resources.maxMessagesAllowedPerMonth, <CustomInput type='number' value={formik.values.maxMessagesAllowedPerMonth} disabled />),
        createData(resources.emailTitle, null),
        createData(resources.maxEmailsAllowedPerMonth, <>
            <CustomInput type='number' onChange={(e: any) => formik.setFieldValue('maxEmailsAllowedPerMonth', e.target.value)} defaultValue={formik.values.maxEmailsAllowedPerMonth} />
            {formik.errors.maxEmailsAllowedPerMonth && <Box sx={{ color: 'red', fontSize: 'small' }}>{formik.errors.maxEmailsAllowedPerMonth}</Box>}
        </>),
        createData(resources.maxEmailsAllowedPerDay, <>
            <CustomInput type='number' onChange={(e: any) => formik.setFieldValue('maxEmailsAllowedPerDay', e.target.value)} defaultValue={formik.values.maxEmailsAllowedPerDay} />
            {formik.errors.maxEmailsAllowedPerDay && <Box sx={{ color: 'red', fontSize: 'small' }}>{formik.errors.maxEmailsAllowedPerDay}</Box>}
        </>),
        createData(resources.useEmailRandom, <Checkbox onChange={(e: any) => formik.setFieldValue('useEmailRandom', e.target.checked ? 1 : 0)} sx={{ padding: 0 }} />),
        createData(resources.emailRandomIntervalBegin, <>
            <CustomInput type='number' onChange={(e: any) => formik.setFieldValue('emailRandomIntervalBegin', e.target.value)} defaultValue={formik.values.emailRandomIntervalBegin} />
            {formik.errors.emailRandomIntervalBegin && <Box sx={{ color: 'red', fontSize: 'small' }}>{formik.errors.emailRandomIntervalBegin}</Box>}
        </>),
        createData(resources.emailRandomIntervalEnd, <>
            <CustomInput type='number' onChange={(e: any) => formik.setFieldValue('emailRandomIntervalEnd', e.target.value)} defaultValue={formik.values.emailRandomIntervalEnd} />
            {formik.errors.emailRandomIntervalEnd && <Box sx={{ color: 'red', fontSize: 'small' }}>{formik.errors.emailRandomIntervalEnd}</Box>}
        </>),

        createData(resources.smstitle, null),
        createData(resources.maxSmssAllowedPerMonth, <>
            <CustomInput type='number' onChange={(e: any) => formik.setFieldValue('maxSmssAllowedPerMonth', e.target.value)} defaultValue={formik.values.maxSmssAllowedPerMonth} />
            {formik.errors.maxSmssAllowedPerMonth && <Box sx={{ color: 'red', fontSize: 'small' }}>{formik.errors.maxSmssAllowedPerMonth}</Box>}
        </>),
        createData(resources.maxSmssAllowedPerDay, <>
            <CustomInput type='number' onChange={(e: any) => formik.setFieldValue('maxSmssAllowedPerDay', e.target.value)} defaultValue={formik.values.maxSmssAllowedPerDay} />
            {formik.errors.maxSmssAllowedPerDay && <Box sx={{ color: 'red', fontSize: 'small' }}>{formik.errors.maxSmssAllowedPerDay}</Box>}
        </>),
        createData(resources.useSmsRandom, <Checkbox onChange={(e: any) => formik.setFieldValue('useSmsRandom', e.target.checked ? 1 : 0)} sx={{ padding: 0 }} />),      
        createData(resources.smsIntervalBegin, <>
            <CustomInput type='number' onChange={(e: any) => formik.setFieldValue('emailRandomIntervalEnd', e.target.value)} defaultValue={formik.values.emailRandomIntervalEnd} />
            {formik.errors.emailRandomIntervalEnd && <Box sx={{ color: 'red', fontSize: 'small' }}>{formik.errors.emailRandomIntervalEnd}</Box>}
        </>),
        createData(resources.smsIntervalEnd, <>
            <CustomInput type='number' onChange={(e: any) => formik.setFieldValue('smsIntervalEnd', e.target.value)} defaultValue={formik.values.smsIntervalEnd} />
            {formik.errors.smsIntervalEnd && <Box sx={{ color: 'red', fontSize: 'small' }}>{formik.errors.smsIntervalEnd}</Box>}
        </>),
    ];

    return useMemo(() =>
        <LayoutDashboard>
            <Helmet>
                <title>{resources.title}</title>
            </Helmet>
            <Box
                sx={{
                    ...containerPage,
                    justifyContent: 'flex-start',
                }}
            >
                <HeaderInformationCard
                    title="Regras de Envio"
                    description="Neste módulo consegue ter acesso às suas Regras de Envio"
                />
                <form onSubmit={formik.handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: "100%",
                        maxWidth: '35rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                    <InformationCard
                        containerStyle={{
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: '#FFFFFFF',
                            width: "95%",
                            maxWidth: '35rem',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '20px',
                            border: '2px solid #bab2c1'
                        }}
                    >

                        <TableContainer>
                            <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            sx={{ display: { lg: "table-row", md: "table-row", sm: "table-row", xs: "grid" } }}
                                            key={row.name}
                                        >
                                            {row.value ?
                                                <TableCell scope="row" sx={{ borderBottom: 'none' }}>
                                                    {row.name}
                                                </TableCell>
                                                :
                                                <TableCell scope="row" sx={{ borderBottom: 'none', fontWeight: 'bold', padding: '5px 16px' }}>
                                                    {row.name}
                                                </TableCell>
                                            }
                                            <TableCell align="left" sx={{ borderBottom: 'none' }}>{row.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </InformationCard>

                    <Button
                        variant='contained'
                        sx={{
                            width: '15rem',
                            height: '2rem',
                            margin: '1rem'
                        }}
                        type="submit"
                    >
                        {resources.buttonSave}
                    </Button>
                </form>

                <Box sx={{ borderTop: '2px solid #bab2c1', padding: '1rem 2rem', width: '95%', fontSize: 'smaller' }}>
                    {resources.disclaimer}
                </Box>

            </Box>
        </LayoutDashboard>, [render, formik.isSubmitting])
}

export default Rules;