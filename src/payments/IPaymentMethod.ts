export interface PaymentMethod {
    process(amount: number, details: any): Promise<void>;
}