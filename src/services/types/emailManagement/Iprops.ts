export interface GeralEmail {
    id: number;
    companyId: string | null;
    queueEmailId: number | null;
    sessionId: number | null;
    dataBagInfo: string | null;
    contactInformation: string | null;
    enqueueDate: string | null;
    serviceId: number | null;
    contact: string | null;
    mediaType: number | null;
    serviceName: string | null;
    canDo: string | null;
    subject: string | null;
    threadId: number | null;
    timeInQueue: string | null;
    queueState: string | null;
    emailTriggerId: number | null;
    from: string | null;
    sender: string | null;
    to: string | null;
    cc: string | null;
    bcc: string | null;
    textBody: string | null;
    htmlBody: string | null;
    dateReceived: string | null;
    idPrioridade: number | null;
    priority: string | null;
    insertMoment: string | null;
    updateMoment: string | null;
    active: boolean | null;
}

export interface ServicoEmail {
    id: number;
    nomeServico: string | null;
    idServico: number | null;
    companyId: string | null;
    insertMoment: string | null;
    updateMoment: string | null;
    active: boolean | null;
}

export interface AllPriority {
    id: number;
    prioridade1: string | null;
    valorPrioridade: string | null;
    dateReceived: string | null;
    insertMoment: string | null;
    updateMoment: string | null;
    active: boolean | null;
}

export interface RowData {
    id: string,
    from: string,
    to: string,
    subject: string,
    dateReceived: any,
    status: string,
    service: string,
    bodyHtml: string,
    body: string,
    priority: string,
    cc: string,
    bcc: string,
    idPriority: string,
    sessionId: string,
    serviceName: string,
    serviceId: string
}


export interface EmailManagerDataResponse {
    totalRecordFromCompany: number;
    totalFilteredRecords: number;
    emailManagerDataRequest: EmailManagerDataRequest | null;
    recordsToReturns: GeralEmail[] | null;
    columnsInformation: ColumnInformation[] | null;
}

export interface EmailManagerDataRequest {
    recordsByPage: number;
    pageNumber: number;
    companyId: string | null;
    languageCode: string | null;
    orderColumn: string | null;
    orderDirection: string | null;
    columnFilters: ColumnInformation[];
}

export interface ColumnInformation {
    headerName: string | null;
    dataName: string | null;
    isSortable: boolean | null;
    searchValue: string | null;
}