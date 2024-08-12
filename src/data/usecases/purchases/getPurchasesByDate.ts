import { Purchase } from "@/domain/models/purchases";
import { IGetPurchasesByDateProtocol } from "@/domain/protocols/purchases";
import elasticsearchClient from "@/infra/elasticsearch/elasticsearchClient";

export class GetPurchasesByDate implements IGetPurchasesByDateProtocol {
    async getPurchasesByDate(params: IGetPurchasesByDateProtocol.Params): Promise<IGetPurchasesByDateProtocol.Result | null> {
        try {
            const { page = 1, pageSize = 10, startDate, endDate } = params;
            const response = await elasticsearchClient.search({
                index: 'purchase_history',
                body: {
                    query: {
                        range: {
                            order_date: {
                                gte: startDate,
                                lte: endDate
                            }
                        }
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
            throw new Error(error.message || 'Error fetching purchase by ORDER_DATE from Elasticsearch');
        }
    }
}