import { Purchase } from "@/domain/models/purchases";
import { IGetPurchasesByStatusProtocol } from "@/domain/protocols/purchases";
import elasticsearchClient from "@/infra/elasticsearch/elasticsearchClient";

export class GetPurchasesByStatus implements IGetPurchasesByStatusProtocol {
    async getPurchasesByStatus(params: IGetPurchasesByStatusProtocol.Params): Promise<IGetPurchasesByStatusProtocol.Result | null> {
        try {
            const response = await elasticsearchClient.search({
                index: 'purchase_history',
                body: {
                    query: {
                        match: { status: params.status }
                    }
                }
            });

            const purchases = response.hits.hits.map((hit: any) => hit._source as Purchase);

            if (purchases.length === 0) {
                return null;
            }

            return { purchases };
        } catch (error: any) {
            throw new Error(error.message || 'Error fetching purchase by STATUS from Elasticsearch');
        }
    }
}