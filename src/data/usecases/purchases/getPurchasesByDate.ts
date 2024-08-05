import { IGetPurchasesByDateProtocol } from "@/domain/protocols/purchases";

export class GetPurchasesByDate implements IGetPurchasesByDateProtocol {
    getPurchasesByDate(params: IGetPurchasesByDateProtocol.Params): Promise<IGetPurchasesByDateProtocol.Result> {
        throw new Error("Method not implemented.");
    }

}