import { Request, Response } from 'express';
import { GetPurchases } from '@/data/usecases/purchases';

export class PurchasesController {
    private getPurchasesUseCase: GetPurchases;

    constructor() {
        this.getPurchasesUseCase = new GetPurchases();
    }

    async getPurchases(req: Request, res: Response): Promise<Response> {
        try {
            const response = await this.getPurchasesUseCase.getPurchases();

            return res.status(200).json(response);
        } catch (error: any) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
}
