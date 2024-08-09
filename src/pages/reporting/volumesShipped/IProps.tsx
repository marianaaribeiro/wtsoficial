import { IGeneralPagedRequest, IColumnInformation } from "../../blockLists/Email/IProps";

export interface IVolumesShipped {
    id: string;
    companyId: string;
    month: string;
    year: string;
    channel: string;
    count: number | null;
}

export interface IVolumesShippedResponse {
    totalCompanyRecordsCount: number;
    totalFilteredRecordsCount: number;
    originalRequest: IGeneralPagedRequest;
    volumesShipped: IVolumesShipped[];
    columnInformation: IColumnInformation[];
}