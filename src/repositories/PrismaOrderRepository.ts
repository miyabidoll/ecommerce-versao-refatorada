import { PrismaClient } from "@prisma/client";
import { CreateOrderData, Order, OrderRepository } from "./IOrderRepository"

export class PrismaOrderRepository implements OrderRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async create(data: CreateOrderData): Promise<Order> {
        return this.prisma.order.create({
            data: {
                customer: data.customer,
                items: JSON.stringify(data.items),
                total: data.total,
                status: data.status
            }
        });
    }
}