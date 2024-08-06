import { Purchase } from "@/domain/models/purchases";

export namespace IGetPurchasesByProductNameProtocol {
    export type Params = GetPurchasesByProductNameParams;
    export type Result = GetPurchasesByProductNameResult | null;
}

interface GetPurchasesByProductNameParams {
    productName: string;
}

interface GetPurchasesByProductNameResult {
    purchases: Array<Purchase>;
}

export interface IGetPurchasesByProductNameProtocol {
    getPurchasesByProductName(params: IGetPurchasesByProductNameProtocol.Params): Promise<IGetPurchasesByProductNameProtocol.Result>
}
