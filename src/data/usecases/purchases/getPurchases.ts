import { IGetPurchasesProtocol } from "@/domain/protocols/purchases";

export class GetPurchases implements IGetPurchasesProtocol {
    getPurchases(): Promise<IGetPurchasesProtocol.Result> {
        throw new Error("Method not implemented.");
    }
}