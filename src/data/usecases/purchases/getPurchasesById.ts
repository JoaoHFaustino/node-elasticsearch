import { IGetPurchaseByIdProtocol } from "@/domain/protocols/purchases";

export class GetPurchasesById implements IGetPurchaseByIdProtocol {
    getPurchaseById(params: IGetPurchaseByIdProtocol.Params): Promise<IGetPurchaseByIdProtocol.Result> {
        throw new Error("Method not implemented.");
    }
}