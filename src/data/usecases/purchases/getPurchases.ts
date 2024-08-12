import { Purchase } from "@/domain/models/purchases";
import { IGetPurchasesProtocol } from "@/domain/protocols/purchases";
import elasticsearchClient from "@/infra/elasticsearch/elasticsearchClient";

export class GetPurchases implements IGetPurchasesProtocol {
    async getPurchases(params: IGetPurchasesProtocol.Params): Promise<IGetPurchasesProtocol.Result> {
        const { page = 1, pageSize = 10 } = params;

        try {
            const response = await elasticsearchClient.search({
                index: 'purchase_history',
                from: (page - 1) * pageSize,
                size: pageSize,
            });

            const purchases = response.hits.hits.map((hit: any) => hit._source as Purchase);

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
            throw new Error(error.message || 'Error fetching purchases from Elasticsearch');
        }
    }
}
