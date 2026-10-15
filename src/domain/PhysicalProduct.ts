import { Product } from "./IProduct"

export class PhysicalProduct implements Product {
    public id: number;
    public name: string;
    public price: number;
    public weight?: number;
    public dimensions?: string;

    constructor(id: number, name: string, price: number, weight?: number, dimensions?: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.weight = weight;
        this.dimensions = dimensions;
    }

    calculateFreight(): number {
        return 10
    }
}