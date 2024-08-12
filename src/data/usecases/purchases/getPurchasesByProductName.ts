import { Purchase } from "@/domain/models/purchases";
import { IGetPurchasesByProductNameProtocol } from "@/domain/protocols/purchases";
import elasticsearchClient from "@/infra/elasticsearch/elasticsearchClient";

export class GetPurchasesByProductName implements IGetPurchasesByProductNameProtocol {
    async getPurchasesByProductName(params: IGetPurchasesByProductNameProtocol.Params): Promise<IGetPurchasesByProductNameProtocol.Result> {
        try {
            const { productName, page = 1, pageSize = 10 } = params;

            const response = await elasticsearchClient.search({
                index: 'purchase_history',
                body: {
                    query: {
                        nested: {
                            path: "items",
                            query: {
                                match: {
                                    "items.product_name": {
                                        query: productName,
                                        fuzziness: 2,
                                        minimum_should_match: "75%"
                                    }
                                }
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
            throw new Error(error.message || 'Error fetching purchase by produtcName from Elasticsearch');
        }
    }
}
