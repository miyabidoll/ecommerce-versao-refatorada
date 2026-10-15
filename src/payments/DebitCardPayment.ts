import { PaymentMethod } from "./IPaymentMethod";
import logger from "../lib/logger";

export class DebitCardPayment implements PaymentMethod {
    async process(amount: number, details: any): Promise<void> {
        logger.info(`Processando débito cartão final ${details.cardNumber.slice(-4)}`);
        
        if (details.cvv === '000') throw new Error('Cartão recusado');
    } 
}