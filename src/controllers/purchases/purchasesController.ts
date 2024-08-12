import { Request, Response } from 'express';
import { GetPurchases, GetPurchasesById, GetPurchasesByCustomer, GetPurchasesByDate, GetPurchasesByStatus, AddPurchase, DeletePurchase } from '@/data/usecases/purchases';
import { GetPurchasesByProductName } from '@/data/usecases/purchases/getPurchasesByProductName';
import { Purchase } from '@/domain/models/purchases';
import { addPurchaseSchema, getPurchasesByDateSchema, getPurchasesByProductNameSchema, getPurchasesByStatusSchema } from '@/validators/purchases';
export class PurchasesController {
    private getPurchasesUseCase: GetPurchases;
    private getPurchaseByIdUseCase: GetPurchasesById;
    private getPurchasesByCustomerUseCase: GetPurchasesByCustomer;
    private getPurchasesByDateUseCase: GetPurchasesByDate;
    private getPurchasesByStatusUseCase: GetPurchasesByStatus;
    private getPurchasesByProductNameUseCase: GetPurchasesByProductName
    private addPurchaseUseCase: AddPurchase
    private deletePurchaseUseCase: DeletePurchase

    constructor() {
        this.getPurchasesUseCase = new GetPurchases();
        this.getPurchaseByIdUseCase = new GetPurchasesById();
        this.getPurchasesByCustomerUseCase = new GetPurchasesByCustomer();
        this.getPurchasesByDateUseCase = new GetPurchasesByDate();
        this.getPurchasesByStatusUseCase = new GetPurchasesByStatus();
        this.getPurchasesByProductNameUseCase = new GetPurchasesByProductName();
        this.addPurchaseUseCase = new AddPurchase();
        this.deletePurchaseUseCase = new DeletePurchase();
    }

    async getPurchases(req: Request, res: Response): Promise<Response> {
        try {
            const page = parseInt(req.query.page as string, 10) || 1;
            const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

            const response = await this.getPurchasesUseCase.getPurchases({ page, pageSize });

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
            const page = parseInt(req.query.page as string, 10) || 1;
            const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

            const response = await this.getPurchasesByCustomerUseCase.getPurchasesByCustomer({ customerId, page, pageSize });

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
            const { error } = getPurchasesByDateSchema.validate(req.query, { abortEarly: false });

            if (error) {
                return res.status(400).json({
                    message: 'Validation error',
                    details: error.details.map(detail => detail.message),
                });
            }

            const { startDate, endDate } = req.query;
            const page = parseInt(req.query.page as string, 10) || 1;
            const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

            if (typeof startDate !== 'string' || typeof endDate !== 'string') {
                return res.status(400).json({
                    message: 'Invalid query parameters'
                });
            }

            const response = await this.getPurchasesByDateUseCase.getPurchasesByDate({ startDate, endDate, page, pageSize });

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
            const { error } = getPurchasesByStatusSchema.validate(req.query, { abortEarly: false });

            if (error) {
                return res.status(400).json({
                    message: 'Validation error',
                    details: error.details.map(detail => detail.message),
                });
            }

            const status = req.params.status;
            const page = parseInt(req.query.page as string, 10) || 1;
            const pageSize = parseInt(req.query.pageSize as string, 10) || 10;
            const response = await this.getPurchasesByStatusUseCase.getPurchasesByStatus({ status, page, pageSize });

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

    async getPurchasesByProductName(req: Request, res: Response): Promise<Response> {
        try {
            const { error } = getPurchasesByProductNameSchema.validate(req.query, { abortEarly: false });

            if (error) {
                return res.status(400).json({
                    message: 'Validation error',
                    details: error.details.map(detail => detail.message),
                });
            }

            const { productName } = req.query;
            const page = parseInt(req.query.page as string, 10) || 1;
            const pageSize = parseInt(req.query.pageSize as string, 10) || 10;
            if (typeof productName !== 'string') {
                return res.status(400).json({
                    message: 'Invalid query parameters'
                });
            }

            const response = await this.getPurchasesByProductNameUseCase.getPurchasesByProductName({ productName, page, pageSize });

            if (!response) {
                return res.status(404).json({
                    message: 'No purchases found for the given productName'
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

    async addPurchase(req: Request, res: Response): Promise<Response> {
        try {
            const { error } = addPurchaseSchema.validate(req.body, { abortEarly: false });

            if (error) {
                return res.status(400).json({
                    message: 'Validation error',
                    details: error.details.map(detail => detail.message),
                });
            }

            const purchaseData: Purchase = req.body;
            const result = await this.addPurchaseUseCase.addPurchase({ purchase: purchaseData });

            if (!result.success) {
                return res.status(400).json({
                    message: result.message
                });
            }

            return res.status(201).json({
                message: result.message
            });
        } catch (error: any) {
            return res.status(500).json({
                message: 'Failed to create purchase',
                error: error.message
            });
        }
    }

    async deletePurchase(req: Request, res: Response): Promise<Response> {
        try {
            const orderId = req.params.orderId
            const result = await this.deletePurchaseUseCase.deletePurchase({ orderId });
            if (!result) {
                return res.status(404).json({
                    message: 'Purchase not found or failed to delete'
                });
            }
            return res.status(204);
        } catch (error: any) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
}