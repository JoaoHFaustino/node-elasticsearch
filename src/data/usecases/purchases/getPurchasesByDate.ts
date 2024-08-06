import { Purchase } from "@/domain/models/purchases";
import { IGetPurchasesByDateProtocol } from "@/domain/protocols/purchases";
import elasticsearchClient from "@/infra/elasticsearch/elasticsearchClient";

export class GetPurchasesByDate implements IGetPurchasesByDateProtocol {
    async getPurchasesByDate(params: IGetPurchasesByDateProtocol.Params): Promise<IGetPurchasesByDateProtocol.Result | null> {
        try {
            const response = await elasticsearchClient.search({
                index: 'purchase_history',
                body: {
                    query: {
                        range: {
                            order_date: {
                                gte: params.startDate,
                                lte: params.endDate
                            }
                        }
                    }
                }
            });

            const purchases = response.hits.hits.map((hit: any) => hit._source as Purchase);

            if (purchases.length === 0) {
                return null;
            }

            return { purchases };
        } catch (error: any) {
            throw new Error(error.message || 'Error fetching purchase by ORDER_DATE from Elasticsearch');
        }
    }
}