import { PurchasesController } from "@/controllers/purchases/purchasesController";
import { Router } from "express";

const purchaseRoutes = Router();
const purchasesController = new PurchasesController();

purchaseRoutes.get('/purchases', (req, res) => purchasesController.getPurchases(req, res));
purchaseRoutes.get('/purchases/customer/:customerId', (req, res) => purchasesController.getPurchasesByCustomer(req, res));
purchaseRoutes.get('/purchases/date', (req, res) => purchasesController.getPurchasesByDate(req, res));
purchaseRoutes.get('/purchases/product-name', (req, res) => purchasesController.getPurchasesByProductName(req, res));
purchaseRoutes.get('/purchases/status/:status', (req, res) => purchasesController.getPurchasesByStatus(req, res));
purchaseRoutes.get('/purchases/:id', (req, res) => purchasesController.getPurchaseById(req, res));
purchaseRoutes.post('/purchases', (req, res) => purchasesController.addPurchase(req, res));
purchaseRoutes.delete('/purchases/:orderId',(req, res) => purchasesController.deletePurchase(req, res));

export default purchaseRoutes;