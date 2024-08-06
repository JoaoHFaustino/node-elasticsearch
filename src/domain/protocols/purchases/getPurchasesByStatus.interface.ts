import { Purchase } from "@/domain/models/purchases";

export namespace IGetPurchasesByStatusProtocol {
    export type Params = GetPurchasesByStatusParams;
    export type Result = GetPurchasesByStatusResult | null;
}

interface GetPurchasesByStatusParams {
    status: string;
    page: number;
    pageSize: number;
}

interface GetPurchasesByStatusResult {
    purchases: Array<Purchase>;
    total: number;
    page: number;
    pageSize: number;
}

export interface IGetPurchasesByStatusProtocol {
    getPurchasesByStatus(params: IGetPurchasesByStatusProtocol.Params): Promise<IGetPurchasesByStatusProtocol.Result>;
}
