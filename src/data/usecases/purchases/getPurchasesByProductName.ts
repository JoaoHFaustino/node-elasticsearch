import { Purchase } from "@/domain/models/purchases";
import { IGetPurchasesByProductNameProtocol } from "@/domain/protocols/purchases";
import elasticsearchClient from "@/infra/elasticsearch/elasticsearchClient";

export class GetPurchasesByProductName implements IGetPurchasesByProductNameProtocol {
    async getPurchasesByProductName(params: IGetPurchasesByProductNameProtocol.Params): Promise<IGetPurchasesByProductNameProtocol.Result> {
        try {
            const { productName } = params;

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
                }
            });

            const purchases = response.hits.hits.map((hit: any) => hit._source as Purchase);

            if (purchases.length === 0) {
                return null;
            }

            return {
                purchases
            };
        } catch (error: any) {
            throw new Error(error.message || 'Error fetching purchase by produtcName from Elasticsearch');
        }
    }
}
