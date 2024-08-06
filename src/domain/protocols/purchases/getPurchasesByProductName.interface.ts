import { Purchase } from "@/domain/models/purchases";

export namespace IGetPurchasesByProductNameProtocol {
    export type Params = GetPurchasesByProductNameParams;
    export type Result = GetPurchasesByProductNameResult | null;
}

interface GetPurchasesByProductNameParams {
    productName: string;
    page: number;
    pageSize: number;
}

interface GetPurchasesByProductNameResult {
    purchases: Array<Purchase>;
    total: number;
    page: number;
    pageSize: number;
}

export interface IGetPurchasesByProductNameProtocol {
    getPurchasesByProductName(params: IGetPurchasesByProductNameProtocol.Params): Promise<IGetPurchasesByProductNameProtocol.Result>
}
