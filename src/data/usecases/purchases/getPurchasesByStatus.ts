import { IGetPurchasesByStatusProtocol } from "@/domain/protocols/purchases";

export class GetPurchasesByStatus implements IGetPurchasesByStatusProtocol {
    getPurchasesByStatus(params: IGetPurchasesByStatusProtocol.Params): Promise<IGetPurchasesByStatusProtocol.Result> {
        throw new Error("Method not implemented.");
    }

}