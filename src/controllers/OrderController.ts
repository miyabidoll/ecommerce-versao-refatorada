import { Request, Response } from "express";
import { OrderService } from "../services/OrderService";
import { ValidationError } from "../errors/ValidationError";
import logger from "../lib/logger";

export class OrderController {
    private orderService: OrderService;

    constructor(orderService: OrderService) {
        this.orderService = orderService;
    }

    processOrder = async (req: Request, res: Response) => {
        try {
          const result = await this.orderService.execute(req.body);
          return res.json({ message: "Pedido processado com sucesso", ...result });
        } catch (error: any) {
            if (error instanceof ValidationError) {
                return res.status(400).json({ error: error.message });
            }
            logger.error(`Erro ao processar pedido: ${error.message}`);
            return res.status(500).json({ error: "Erro interno" });
        }
    }
}