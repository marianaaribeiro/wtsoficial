import * as xlsx from "xlsx";
import { viewCampaignsServices } from "../services/viewCampaigns";

/* mock data

donst data = valuesExcel?.map((item: any) => {
        return {
            "De": item.from,
            "Para": item.to,
            "Bcc": item.bcc,
            "Cc": item.cc,
            "Assunto": item.subject,
            "body": item.body,
            "Serviço": item.serviceName,
            "Data": item.dateReceived,
            "Prioridade Atual": item.status,
        }
    });

*/

/* download excel */
export const handleDownloadExcel = (
    valuesExcel: any[],
    data: any,
    setValueErrorFilter: (e: boolean) => void,
    setloadingExcel: (e: boolean) => void) => {
    const excelTable: any[] = [];
    let countRow = 2;

    valuesExcel?.map(() => {

        excelTable.push(data);

        countRow += 1;

        return null;
    });

    const workSheet = xlsx.utils.json_to_sheet(excelTable);
    const workBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, workSheet, "emails");

    xlsx.write(workBook, { bookType: "xlsx", type: "buffer" });
    xlsx.write(workBook, { bookType: "xlsx", type: "binary" });

    xlsx.writeFile(workBook, "Email.xlsx");
    setTimeout(() => {
        setValueErrorFilter(false);
        setloadingExcel(false);
    }, 300);
};

export const getDataTable = async (values: any, cookieValue: any, auth: any, data: any, setValueErrorFilter: (e: boolean) => void,
    setloadingExcel: (e: boolean) => void, setOpenAlertExcel: (e: any) => void) => {
    try {
        if (auth?.urlEnviroments) {
            const response = await viewCampaignsServices.postPagedGeral(cookieValue, values, auth?.urlEnviroments.HOST.API_DIGITAL_URL);
            setTimeout(() => {
                handleDownloadExcel(response?.recordsToReturns || [], data, setValueErrorFilter,
                    setloadingExcel)
            }, 300);
        }
    } catch (error) {
        handleClickAlertExcel(false, setOpenAlertExcel);
    }
}

/* call export excel */
/* export const handleGetValueExcel = () => {
    filterData(String(itemValueService), String(itemValueServicePriority), valueDataStart.formart, valueDataEnd.formart, orientationSort.columnTable || "id", orientationSort.sortTable || "desc", 0, 100000000000, true, valueInputFilter || "");
    remove();
} */

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