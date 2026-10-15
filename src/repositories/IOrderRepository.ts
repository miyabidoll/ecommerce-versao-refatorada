export interface CreateOrderData {
    customer: string;
    items: any[];
    total: number;
    status: string;
}

export interface Order {
    id: number;
    customer: string;
    total: number;
    status: string;
}

export interface OrderRepository {
    create(data: CreateOrderData): Promise<Order>;
}
