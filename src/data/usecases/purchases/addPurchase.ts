import { IAddPurchaseProtocol } from "@/domain/protocols/purchases";
import elasticsearchClient from "@/infra/elasticsearch/elasticsearchClient";

export class AddPurchase implements IAddPurchaseProtocol {
    async addPurchase(params: IAddPurchaseProtocol.Params): Promise<IAddPurchaseProtocol.Result> {
        try {
            const { purchase } = params;
            await elasticsearchClient.index({
                index: 'purchase_history',
                id: purchase.orderId,
                body: {
                    customer_id: params.purchase.customerId,
                    items: params.purchase.items,
                    order_date: params.purchase.orderDate,
                    order_id: params.purchase.orderId,
                    shipping_address: params.purchase.shippingAddress,
                    status: params.purchase.status,
                    total_amount: params.purchase.totalAmount
                }
            });

            return {
                success: true,
                message: 'Purchase created successfully',
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message || 'Error adding purchase to Elasticsearch',
            };
        }
    }
}
