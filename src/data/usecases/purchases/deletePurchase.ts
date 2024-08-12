import { IDeletePurchaseProtocol } from "@/domain/protocols/purchases";
import elasticsearchClient from "@/infra/elasticsearch/elasticsearchClient";

export class DeletePurchase implements IDeletePurchaseProtocol {
    async deletePurchase(params: IDeletePurchaseProtocol.Params): Promise<IDeletePurchaseProtocol.Result> {
        const { orderId } = params
        try {
            const response = await elasticsearchClient.delete({
                index: 'purchase_history',
                id: orderId
            });
            return response.result === 'deleted';
        } catch (error: any) {
            if (error.meta && error.meta.body && error.meta.body.result === 'not_found') {
                return false;
            } else {
                throw new Error(error.message || 'Error deleting purchase from Elasticsearch');
            }
        }
    }
}