import { PrismaClient } from "@prisma/client";
import { ProductData, ProductRepository } from "./IProductRepository"

export class PrismaProductRepository implements ProductRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async findById(id: number): Promise<ProductData | null> {
        return this.prisma.product.findUnique({ where: { id } });
    }
}