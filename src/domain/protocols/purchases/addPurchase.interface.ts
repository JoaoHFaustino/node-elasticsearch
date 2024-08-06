import { Purchase } from "@/domain/models/purchases";

export namespace IAddPurchaseProtocol {
    export type Params = AddPurchaseParams;
    export type Result = AddPurchaseResult;
}

interface AddPurchaseParams {
    purchase: Purchase;
}

interface AddPurchaseResult {
    success: boolean;
    message: string;
}

export interface IAddPurchaseProtocol {
    addPurchase(params: IAddPurchaseProtocol.Params): Promise<IAddPurchaseProtocol.Result>;
}
