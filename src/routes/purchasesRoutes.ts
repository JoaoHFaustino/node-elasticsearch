import { PurchasesController } from "@/controllers/purchases/purchasesController";
import { Router } from "express";

const purchaseRoutes = Router();

const productsController = new PurchasesController();

purchaseRoutes.get('/purchases', (req, res) => productsController.getPurchases(req, res));

export default purchaseRoutes;