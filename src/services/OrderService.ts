import { ProductRepository } from "../repositories/IProductRepository";
import { OrderRepository } from "../repositories/IOrderRepository";
import { NotificationService } from "./NotificationService";
import { PaymentMethod } from "../payments/IPaymentMethod";
import { ValidationError } from "../errors/ValidationError";
import { Product } from "../domain/IProduct";
import { ProductFactory } from "../domain/ProductFactory";
import logger from "../lib/logger";

export interface CreateOrderInput {
    customer: string;
    items: { productId: number; quantity: number }[];
    paymentMethod: string;
    paymentDetails: any;
}

export class OrderService {
    productRespository: ProductRepository;
    orderRepository: OrderRepository;
    notificationService: NotificationService;
    paymentMethods: Record<string, PaymentMethod>;

    constructor(productRespository: ProductRepository,
                orderRepository: OrderRepository,
                notificationService: NotificationService,
                paymentMethods: Record<string, PaymentMethod>) {
                    this.productRespository = productRespository;
                    this.orderRepository = orderRepository;
                    this.notificationService = notificationService;
                    this.paymentMethods = paymentMethods;
                }

    async execute(input: CreateOrderInput): Promise<{ orderId: number; emailPreview: string | null }> {
        if (!input.items || input.items.length === 0) {
            logger.error('Tentativa de pedido sem itens');

            throw new ValidationError("Carrinho vazio");
        }

        let total = 0
        const products: Product[] = []
        const orderItems: any[] = []

        for (const i of input.items) {
            const data = await this.productRespository.findById(i.productId);

            if (!data) {
                throw new ValidationError(`Produto ${i.productId} não existe.`)
            }

            const product = ProductFactory.createProduct(data);

            total += product.price * i.quantity + product.calculateFreight();

            products.push(product)
            orderItems.push({ ...data, quantity: i.quantity});
        }

        const method = this.paymentMethods[input.paymentMethod];

        if (!method) {
            throw new ValidationError("Método de pagamento não existe");
        }

        await method.process(total, input.paymentDetails);

        const order = await this.orderRepository.create({ customer: input.customer, items: orderItems, total, status: 'confirmed'})

        const emailPreview = await this.notificationService.sendOrderConfirmation(input.customer, order.id, total, products);
    
        return { orderId: order.id, emailPreview };
    }
}