import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPayments, processingPay } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPayments)
  .post("/process", processingPay);

export { paymentsRouter };
