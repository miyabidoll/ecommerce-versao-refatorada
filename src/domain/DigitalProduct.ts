import { Product } from "./IProduct";

export class DigitalProduct implements Product {
    public id: number;
    public name: string;
    public price: number;

    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    calculateFreight(): number {
        return 0
    }
}