import { Purchase } from "@/domain/models/purchases";

export namespace IGetPurchasesProtocol {
    export type Result = GetPurchasesResult;
}

interface GetPurchasesResult {
    purchases: Array<Purchase>;
}

export interface IGetPurchasesProtocol {
    getPurchases(): Promise<IGetPurchasesProtocol.Result>;
}