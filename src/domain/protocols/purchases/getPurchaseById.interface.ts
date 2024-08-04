import { Purchase } from "@/domain/models/purchases";

export namespace IGetPurchaseByIdProtocol {
    export type Params = GetPurchaseByIdParams;
    export type Result = Purchase;
}

interface GetPurchaseByIdParams {
    orderId: string;
}

export interface IGetPurchaseByIdProtocol {
    getPurchaseById(params: IGetPurchaseByIdProtocol.Params): Promise<IGetPurchaseByIdProtocol.Result>;
}
