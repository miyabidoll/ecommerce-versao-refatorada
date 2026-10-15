export interface ProductData {
    id: number;
    name: string;
    type: string;
    price: number;
}

export interface ProductRepository {
    findById(id: number): Promise<ProductData | null>
}