import { AuthenticatedRequest } from '@/middlewares';
import allServices from '@/services/payments-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketId = Number(req.query.ticketId);
    const { userId } = req;

    if (!ticketId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const payments = await allServices.getPayments(userId, ticketId);

    if (!payments) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(payments);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function processingPay(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { ticketId, cardData } = req.body;

    if (!ticketId || !cardData) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const payments = await allServices.processingPay(ticketId, userId, cardData);

    if (!payments) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send(payments);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
