import { Purchase } from "@/domain/models/purchases";
import { IGetPurchaseByIdProtocol } from "@/domain/protocols/purchases";
import elasticsearchClient from "@/infra/elasticsearch/elasticsearchClient";

export class GetPurchasesById implements IGetPurchaseByIdProtocol {
    async getPurchaseById(params: IGetPurchaseByIdProtocol.Params): Promise<IGetPurchaseByIdProtocol.Result> {
        try {
            const response = await elasticsearchClient.search({
                index: 'purchase_history',
                body: {
                    query: {
                        match: { order_id: params.orderId }
                    }
                }
            });

            const hits = response.hits?.hits ?? [];
            if (hits.length === 0) {
                return null;
            }
    
            const purchases = hits.map((hit: any) => hit._source as Purchase);
            return purchases[0];
        } catch (error: any) {
            throw new Error(error.message || 'Error fetching purchase by ID from Elasticsearch');
        }
    }
}