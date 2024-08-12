import { Purchase } from "@/domain/models/purchases";

export namespace IGetPurchasesByCustomerProtocol {
    export type Params = GetPurchasesByCustomerParams;
    export type Result = GetPurchasesByCustomerResult | null;
}

interface GetPurchasesByCustomerParams {
    customerId: string;
    page: number;
    pageSize: number;
}

interface GetPurchasesByCustomerResult {
    purchases: Array<Purchase>;
    total: number;
    page: number;
    pageSize: number;
}

export interface IGetPurchasesByCustomerProtocol {
    getPurchasesByCustomer(params: IGetPurchasesByCustomerProtocol.Params): Promise<IGetPurchasesByCustomerProtocol.Result>;
}
