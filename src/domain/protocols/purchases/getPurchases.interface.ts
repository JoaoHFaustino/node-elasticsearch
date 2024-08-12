import { Purchase } from "@/domain/models/purchases";

export namespace IGetPurchasesProtocol {
    export type Params = GetPurchasesParams
    export type Result = GetPurchasesResult | null;
}

interface GetPurchasesParams {
    page: number;
    pageSize: number;
}
interface GetPurchasesResult {
    purchases: Array<Purchase>;
    total: number;
    page: number;
    pageSize: number;
}

export interface IGetPurchasesProtocol {
    getPurchases(params: IGetPurchasesProtocol.Params): Promise<IGetPurchasesProtocol.Result>;
}