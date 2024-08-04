import { Purchase } from "@/domain/models/purchases";

export namespace IGetPurchasesByCustomerProtocol {
    export type Params = GetPurchasesByCustomerParams;
    export type Result = GetPurchasesByCustomerResult;
}

interface GetPurchasesByCustomerParams {
    customerId: string;
}

interface GetPurchasesByCustomerResult {
    purchases: Array<Purchase>;
}

export interface IGetPurchasesByCustomerProtocol {
    getPurchasesByCustomer(params: IGetPurchasesByCustomerProtocol.Params): Promise<IGetPurchasesByCustomerProtocol.Result>;
}
