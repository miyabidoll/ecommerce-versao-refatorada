import { MailMessage, MailProvider } from "../providers/IMailProvider";
import { Product } from "../domain/IProduct";

export class NotificationService {
    private mailProvider: MailProvider;

    constructor(mailProvider: MailProvider) {
        this.mailProvider = mailProvider;
    }

    sendOrderConfirmation(customer: string, orderId: number, total: number, products: Product[]): Promise<string | null> {
        const message: MailMessage = {
            from: '"DevStore" <noreply@devstore.com>',
            to: customer, // O email do cliente vindo do body
            subject: `Confirmação do Pedido #${orderId}`,
            text: `Olá, seu pedido #${orderId} no valor de R$ ${total} foi confirmado.`,
            html: `
            <h1>Pedido Confirmado!</h1>
            <p>Olá, seu pedido <b>#${orderId}</b> foi processado com sucesso.</p>
            <p>Total: <strong>R$ ${total}</strong></p>
            <ul>
                ${products.map(p => `<li>${p.name}</li>`).join('')}
            </ul>
            `
        }

        return this.mailProvider.sendMail(message)
    }
}