import { Request, Response } from 'express';
import { GetPurchases, GetPurchasesById, GetPurchasesByCustomer, GetPurchasesByDate, GetPurchasesByStatus } from '@/data/usecases/purchases';

export class PurchasesController {
    private getPurchasesUseCase: GetPurchases;
    private getPurchaseByIdUseCase: GetPurchasesById;
    private getPurchasesByCustomerUseCase: GetPurchasesByCustomer;
    private getPurchasesByDateUseCase: GetPurchasesByDate;
    private getPurchasesByStatusUseCase: GetPurchasesByStatus;

    constructor() {
        this.getPurchasesUseCase = new GetPurchases();
        this.getPurchaseByIdUseCase = new GetPurchasesById();
        this.getPurchasesByCustomerUseCase = new GetPurchasesByCustomer();
        this.getPurchasesByDateUseCase = new GetPurchasesByDate();
        this.getPurchasesByStatusUseCase = new GetPurchasesByStatus();
    }

    async getPurchases(req: Request, res: Response): Promise<Response> {
        try {
            const response = await this.getPurchasesUseCase.getPurchases();

            if (!response) {
                return res.status(404).json({
                    message: 'Purchase not found for the given ID'
                });
            }

            return res.status(200).json(response);
        } catch (error: any) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    }

    async getPurchaseById(req: Request, res: Response): Promise<Response> {
        try {
            const purchaseId = req.params.id;
            const response = await this.getPurchaseByIdUseCase.getPurchaseById({ orderId: purchaseId });

            if (!response) {
                return res.status(404).json({
                    message: 'Purchase not found'
                });
            }

            return res.status(200).json(response);
        } catch (error: any) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    }

    async getPurchasesByCustomer(req: Request, res: Response): Promise<Response> {
        try {
            const customerId = req.params.customerId;
            const response = await this.getPurchasesByCustomerUseCase.getPurchasesByCustomer({ customerId });

            if (!response) {
                return res.status(404).json({
                    message: 'No purchases found for the given customer ID'
                });
            }

            return res.status(200).json(response);
        } catch (error: any) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    }

    async getPurchasesByDate(req: Request, res: Response): Promise<Response> {
        try {
            const { startDate, endDate } = req.query;
            if (typeof startDate !== 'string' || typeof endDate !== 'string') {
                return res.status(400).json({
                    message: 'Invalid query parameters'
                });
            }
            const response = await this.getPurchasesByDateUseCase.getPurchasesByDate({ startDate, endDate });

            if (!response) {
                return res.status(404).json({
                    message: 'No purchases found for the given date range'
                });
            }

            return res.status(200).json(response);
        } catch (error: any) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    }

    async getPurchasesByStatus(req: Request, res: Response): Promise<Response> {
        try {
            const status = req.params.status;
            const response = await this.getPurchasesByStatusUseCase.getPurchasesByStatus({ status });

            if (!response) {
                return res.status(404).json({
                    message: 'No purchases found for the given status'
                });
            }

            return res.status(200).json(response);
        } catch (error: any) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
}
