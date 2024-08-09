import * as xlsx from "xlsx";
import { emailBlackListManagementServices } from "../../../../services/emailBlackList";

/* download excel */
export const handleDownloadExcel = (
    valuesExcel: any[],
    setValueErrorFilter: (e: boolean) => void,
    setloadingExcel: (e: boolean) => void) => {
    const excelTable: any[] = [];

    valuesExcel?.map((item: any) => {
        excelTable.push({
            "email": item.email,
            "createdOn": item.createdOn,
            "createdBy": item.createdBy
        });
        return null;
    });

    const workSheet = xlsx.utils.json_to_sheet(excelTable);
    const workBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, workSheet, "emails");

    xlsx.write(workBook, { bookType: "xlsx", type: "buffer" });
    xlsx.write(workBook, { bookType: "xlsx", type: "binary" });

    xlsx.writeFile(workBook, "EmailBlackList.xlsx");
    
    setTimeout(() => {
        setValueErrorFilter(false);
        setloadingExcel(false);
    }, 300);
};

export const getEmailsBlacklistDataTableExcel = async (params: any, cookieValue: any, auth: any, setValueErrorFilter: (e: boolean) => void,
    setloadingExcel: (e: boolean) => void, setOpenAlertExcel: (e: any) => void) => {
    try {
        if (auth?.urlEnviroments) {
            const response = await emailBlackListManagementServices.getEmailBlackListPaged(cookieValue, params, () => {}, auth?.urlEnviroments.HOST.API_DIGITAL_URL);

            setTimeout(() => {
                handleDownloadExcel(response.blackListedEmails || [], setValueErrorFilter,
                    setloadingExcel)
            }, 300);
        }
    } catch (error) {
        handleClickAlertExcel(false, setOpenAlertExcel);
    }
}

export const exportExcel = (listParams: any, excelParams: any) => {    
    getEmailsBlacklistDataTableExcel(
        listParams,
        excelParams.cookieValue, 
        excelParams.auth, 
        excelParams.setValueErrorFilter, 
        excelParams.setloadingExcel, 
        excelParams.setOpenAlertExcel)
}

/* Alert excel */
export const handleClickAlertExcel = (item: boolean, setOpenAlertExcel: (e: any) => void) => {
    if (item) {
        setOpenAlertExcel({ value: true, status: "success", events: null });

    } else {
        setOpenAlertExcel({ value: true, status: "error", events: null });
    }
};

export const handleCloseAlertExcel = (event?: any, reason?: string, setOpenAlertExcel?: (e: any) => void) => {
    if (reason === 'clickaway') {
        return;
    }

    if (setOpenAlertExcel) {
        setOpenAlertExcel({ value: false, status: "", events: event });
    }
};