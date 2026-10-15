import { PaymentMethod } from "./IPaymentMethod";
import logger from "../lib/logger";

export class PixPayment implements PaymentMethod {
    async process(amount: number, details: any): Promise<void> {
        logger.info(`Aguardando pagamento Pix de R$${amount}`);
    } 
}