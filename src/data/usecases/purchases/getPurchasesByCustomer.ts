import { IGetPurchasesByCustomerProtocol } from "@/domain/protocols/purchases";

export class GetPurchasesByCustomer implements IGetPurchasesByCustomerProtocol {
    getPurchasesByCustomer(params: IGetPurchasesByCustomerProtocol.Params): Promise<IGetPurchasesByCustomerProtocol.Result> {
        throw new Error("Method not implemented.");
    }

}