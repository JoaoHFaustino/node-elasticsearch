import { Purchase } from "@/domain/models/purchases";
import { IGetPurchasesProtocol } from "@/domain/protocols/purchases";
import elasticsearchClient from "@/infra/elasticsearch/elasticsearchClient";

export class GetPurchases implements IGetPurchasesProtocol {
    async getPurchases(): Promise<IGetPurchasesProtocol.Result> {
        const response = await elasticsearchClient.search({
            index: 'purchase_history'
        });

        const purchases = response.hits.hits.map((hit: any) => hit._source as Purchase);
        return { purchases };
    }
}