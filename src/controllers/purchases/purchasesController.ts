import { Request, Response } from 'express';
import { GetPurchases, GetPurchasesById, GetPurchasesByCustomer, GetPurchasesByDate, GetPurchasesByStatus, AddPurchase } from '@/data/usecases/purchases';
import { GetPurchasesByProductName } from '@/data/usecases/purchases/getPurchasesByProductName';
import { Purchase } from '@/domain/models/purchases';
import { addPurchaseSchema, getPurchaseByIdSchema, getPurchasesByCustomerSchema, getPurchasesByDateSchema, getPurchasesByProductNameSchema, getPurchasesByStatusSchema } from '@/validators/purchases';
export class PurchasesController {
    private getPurchasesUseCase: GetPurchases;
    private getPurchaseByIdUseCase: GetPurchasesById;
    private getPurchasesByCustomerUseCase: GetPurchasesByCustomer;
    private getPurchasesByDateUseCase: GetPurchasesByDate;
    private getPurchasesByStatusUseCase: GetPurchasesByStatus;
    private getPurchasesByProductNameUseCase: GetPurchasesByProductName
    private addPurchaseUseCase: AddPurchase

    constructor() {
        this.getPurchasesUseCase = new GetPurchases();
        this.getPurchaseByIdUseCase = new GetPurchasesById();
        this.getPurchasesByCustomerUseCase = new GetPurchasesByCustomer();
        this.getPurchasesByDateUseCase = new GetPurchasesByDate();
        this.getPurchasesByStatusUseCase = new GetPurchasesByStatus();
        this.getPurchasesByProductNameUseCase = new GetPurchasesByProductName();
        this.addPurchaseUseCase = new AddPurchase();
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
            const { error } = getPurchaseByIdSchema.validate(req.query, { abortEarly: false });

            if (error) {
              return res.status(400).json({
                message: 'Validation error',
                details: error.details.map(detail => detail.message),
              });
            }

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
            const { error } = getPurchasesByCustomerSchema.validate(req.query, { abortEarly: false });

            if (error) {
              return res.status(400).json({
                message: 'Validation error',
                details: error.details.map(detail => detail.message),
              });
            }
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
            const { error } = getPurchasesByDateSchema.validate(req.query, { abortEarly: false });

            if (error) {
              return res.status(400).json({
                message: 'Validation error',
                details: error.details.map(detail => detail.message),
              });
            }

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
            const { error } = getPurchasesByStatusSchema.validate(req.query, { abortEarly: false });

            if (error) {
              return res.status(400).json({
                message: 'Validation error',
                details: error.details.map(detail => detail.message),
              });
            }
            
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
            if (typeof productName !== 'string') {
                return res.status(400).json({
                    message: 'Invalid query parameters'
                });
            }
            const response = await this.getPurchasesByProductNameUseCase.getPurchasesByProductName({ productName });

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
    
}
