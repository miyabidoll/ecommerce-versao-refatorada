import { PrismaClient } from "@prisma/client";
import express from "express";
import { PrismaProductRepository } from "./repositories/PrismaProductRepository";
import { PrismaOrderRepository } from "./repositories/PrismaOrderRepository";
import { NotificationService } from "./services/NotificationService";
import { EtherealMailProvider } from "./providers/EtherealMailProvider";
import { CreditCardPayment } from "./payments/CreditCardPayment";
import { DebitCardPayment } from "./payments/DebitCardPayment";
import { PixPayment } from "./payments/PixPayment";
import { OrderService } from "./services/OrderService";
import { OrderController } from "./controllers/OrderController";
import { PaymentMethod } from "./payments/IPaymentMethod";

const app = express();
app.use(express.json());

const prisma = new PrismaClient;

const productRespository = new PrismaProductRepository(prisma);
const orderRepository = new PrismaOrderRepository(prisma);
const notificationService = new NotificationService(new EtherealMailProvider());

const paymentMethods: Record<string, PaymentMethod> = {
    credit_card: new CreditCardPayment(),
    debit_card: new DebitCardPayment(),
    pix: new PixPayment()
};

const orderService = new OrderService(productRespository, orderRepository, notificationService, paymentMethods);
const orderController = new OrderController(orderService);

app.post("/orders", orderController.processOrder);

export default app;