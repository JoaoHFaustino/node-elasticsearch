import { Purchase } from "@/domain/models/purchases";
import { IGetPurchasesByCustomerProtocol } from "@/domain/protocols/purchases";
import elasticsearchClient from "@/infra/elasticsearch/elasticsearchClient";

export class GetPurchasesByCustomer implements IGetPurchasesByCustomerProtocol {
    async getPurchasesByCustomer(params: IGetPurchasesByCustomerProtocol.Params): Promise<IGetPurchasesByCustomerProtocol.Result> {
        try {
            const response = await elasticsearchClient.search({
                index: 'purchase_history',
                body: {
                    query: {
                        match: { customer_id: params.customerId }
                    }
                }
            });

            const purchases = response.hits.hits.map((hit: any) => hit._source as Purchase);

            if (purchases.length === 0) {
                return null;
            }

            return { purchases };
        } catch (error: any) {
            throw new Error(error.message || 'Error fetching purchase by CUSTOMER_ID from Elasticsearch');
        }
    }
}