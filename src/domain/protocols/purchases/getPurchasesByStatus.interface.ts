import { Purchase } from "@/domain/models/purchases";

export namespace IGetPurchasesByStatusProtocol {
    export type Params = GetPurchasesByStatusParams;
    export type Result = GetPurchasesByStatusResult;
}

interface GetPurchasesByStatusParams {
    status: string;
}

interface GetPurchasesByStatusResult {
    purchases: Array<Purchase>;
}

export interface IGetPurchasesByStatusProtocol {
    getPurchasesByStatus(params: IGetPurchasesByStatusProtocol.Params): Promise<IGetPurchasesByStatusProtocol.Result>;
}
