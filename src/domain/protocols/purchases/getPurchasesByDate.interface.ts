import { Purchase } from "@/domain/models/purchases";

export namespace IGetPurchasesByDateProtocol {
    export type Params = GetPurchasesByDateParams;
    export type Result = GetPurchasesByDateResult | null;
}

interface GetPurchasesByDateParams {
    startDate: string;
    endDate: string;
}

interface GetPurchasesByDateResult {
    purchases: Array<Purchase>;
}

export interface IGetPurchasesByDateProtocol {
    getPurchasesByDate(params: IGetPurchasesByDateProtocol.Params): Promise<IGetPurchasesByDateProtocol.Result>;
}
