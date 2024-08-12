import { Purchase } from "@/domain/models/purchases";
import { IGetPurchasesByStatusProtocol } from "@/domain/protocols/purchases";
import elasticsearchClient from "@/infra/elasticsearch/elasticsearchClient";

export class GetPurchasesByStatus implements IGetPurchasesByStatusProtocol {
    async getPurchasesByStatus(params: IGetPurchasesByStatusProtocol.Params): Promise<IGetPurchasesByStatusProtocol.Result | null> {
        try {
            const { page = 1, pageSize = 10, status } = params;
            const response = await elasticsearchClient.search({
                index: 'purchase_history',
                body: {
                    query: {
                        match: { status: status }
                    }
                },
                from: (page - 1) * pageSize,
                size: pageSize
            });

            const purchases = response.hits.hits.map((hit: any) => hit._source as Purchase);

            if (purchases.length === 0) {
                return null;
            }

            const total = typeof response.hits.total === 'number'
                ? response.hits.total
                : response.hits.total?.value || 0;

            return {
                purchases,
                total,
                page,
                pageSize
            };
        } catch (error: any) {
            throw new Error(error.message || 'Error fetching purchase by STATUS from Elasticsearch');
        }
    }
}