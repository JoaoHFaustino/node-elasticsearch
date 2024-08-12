import { IAddPurchaseProtocol } from "@/domain/protocols/purchases";
import elasticsearchClient from "@/infra/elasticsearch/elasticsearchClient";

export class AddPurchase implements IAddPurchaseProtocol {
    async addPurchase(params: IAddPurchaseProtocol.Params): Promise<IAddPurchaseProtocol.Result> {
        try {
            const { purchase } = params;

            const items = purchase.items.map(item => ({
                product_id: item.productId,
                product_name: item.productName,
                quantity: item.quantity,
                price_per_unit: item.pricePerUnit,
            }));

            await elasticsearchClient.index({
                index: 'purchase_history',
                id: purchase.orderId,
                body: {
                    customer_id: params.purchase.customerId,
                    items: items,
                    order_date: params.purchase.orderDate,
                    order_id: params.purchase.orderId,
                    shipping_address: {
                        address_line_1: params.purchase.shippingAddress.addressLine1,
                        address_line_2: params.purchase.shippingAddress.addressLine2,
                        city: params.purchase.shippingAddress.city,
                        state: params.purchase.shippingAddress.state,
                        zip_code: params.purchase.shippingAddress.zipCode,
                        country: params.purchase.shippingAddress.country
                    },
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
