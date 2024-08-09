export interface IBlacklistEmail {
    id?: number;
    companyId?: number | null;
    email: string;
    deleted?: number;
    deletedOn?: string | null;
    deletedBy?: string | null;
    createdOn?: string;
    createdBy: string | null;
}

export interface IBlackListEmailReponse {
    totalCompanyRecordsCount: number;
    totalFilteredRecordsCount: number;
}

export interface IColumnInformation {
    headerName?: string | null;
    dataName?: string | null;
    isSortable?: boolean | null;
    searchValue?: string | null;
    searchStartDate?: string | null;
    searchEndDate?: string | null;
}

export interface IBlackListEmailReponse {
    totalCompanyRecordsCount: number;
    totalFilteredRecordsCount: number;
    originalRequest: IGeneralPagedRequest;
    blackListedEmails: IBlacklistEmail[];
    columnInformation: IColumnInformation[];
}

export interface IGeneralPagedRequest {
    recordsByPage: number;
    pageNumber: number;
    companyId: string | null;
    languageCode: string | null;
    orderColumn: string | null;
    orderDirection: string | null;
    columnFilters: IColumnInformation[];
}