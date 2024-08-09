import { emailBlackListManagementServices } from "../../../../services/emailBlackList";

const donwloadBlob = (csv: string, type: string, title: string) => {
    // Create a blob
    const blob = new Blob([csv], { type: type });
    const url = URL.createObjectURL(blob);

    // Create a link to download it
    const pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', title);
    pom.click();
}

const handleDownloadCSV = async (valuesCSV: any[],
    setValueErrorFilter: (e: boolean) => void,
    setloadingCSV: (e: boolean) => void) => {
    const csvTable: any[] = [];

    valuesCSV?.map((item: any) => {
        csvTable.push({
            "email": item.email,
            "createdOn": item.createdOn,
            "createdBy": item.createdBy
        });
        return null;
    });

    let csv = '';
    // Get the headers
    const headers = Object.keys(csvTable[0]);
    csv += headers.join(',') + '\n';
    // Add the data
    csvTable.forEach(function (row) {
        const data = headers.map(header => JSON.stringify(row[header])).join(','); // Add JSON.stringify statement
        csv += data + '\n';
    });
    
    donwloadBlob(csv, 'text/csv;charset=utf-8;', 'EmailBlackList')

    setTimeout(() => {
        setValueErrorFilter(false);
        setloadingCSV(false);
    }, 300);
};

export const getEmailsBlacklistDataTableCSV = async (params: any, cookieValue: any, auth: any, setValueErrorFilter: (e: boolean) => void,
    setloadingCSV: (e: boolean) => void, setOpenAlertCSV: (e: any) => void) => {
  
    try {
        if (auth?.urlEnviroments) {
            const response = await emailBlackListManagementServices.getEmailBlackListPaged(cookieValue, params, () => {}, auth?.urlEnviroments.HOST.API_DIGITAL_URL);

            setTimeout(() => {
                handleDownloadCSV(response.blackListedEmails || [], setValueErrorFilter,
                    setloadingCSV)
            }, 300);
        }
    } catch (error) {
        handleClickAlertCSV(false, setOpenAlertCSV);
    }
}

export const exportCSV = (listParams: any, csvParams: any) => {    
    getEmailsBlacklistDataTableCSV(
        listParams,
        csvParams.cookieValue, 
        csvParams.auth, 
        csvParams.setValueErrorFilter, 
        csvParams.setloadingCSV, 
        csvParams.setOpenAlertCSV)
}

/* Alert excel */
export const handleClickAlertCSV = (item: boolean, setOpenAlertCSV: (e: any) => void) => {
    if (item) {
        setOpenAlertCSV({ value: true, status: "success", events: null });

    } else {
        setOpenAlertCSV({ value: true, status: "error", events: null });
    }
};

export const handleCloseAlertCSV = (event?: any, reason?: string, setOpenAlertCSV?: (e: any) => void) => {
    if (reason === 'clickaway') {
        return;
    }

    if (setOpenAlertCSV) {
        setOpenAlertCSV({ value: false, status: "", events: event });
    }
};