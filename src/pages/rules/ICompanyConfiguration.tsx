export interface ICompanyConfiguration {
    id: number;
    companyId: number;
    maxMessagesAllowedPerMonth: number | null;
    maxEmailsAllowedPerMonth: number | null;
    maxEmailsAllowedPerDay: number | null;
    useEmailRandom: number;
    emailRandomIntervalBegin: number | null;
    emailRandomIntervalEnd: number | null;
    maxSmssAllowedPerMonth: number | null;
    maxSmssAllowedPerDay: number | null;
    useSmsRandom: number;
    smsIntervalBegin: number | null;
    smsIntervalEnd: number | null;
    languageCode: string | null;
}