import { Item } from "./item";
import { ShippingAddress } from "./shippingAddress";

export interface Purchase {
    orderId: string;
    customerId: string;
    orderDate: string;
    totalAmount: number;
    items: Array<Item>;
    shippingAddress: ShippingAddress;
    status: string;
}
