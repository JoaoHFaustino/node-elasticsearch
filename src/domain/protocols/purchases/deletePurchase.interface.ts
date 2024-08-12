export namespace IDeletePurchaseProtocol {
    export type Params = DeletePurchaseParams;
    export type Result = boolean;
}

interface DeletePurchaseParams {
    orderId: string;
}

export interface IDeletePurchaseProtocol {
    deletePurchase(params: IDeletePurchaseProtocol.Params): Promise<IDeletePurchaseProtocol.Result>;
}
