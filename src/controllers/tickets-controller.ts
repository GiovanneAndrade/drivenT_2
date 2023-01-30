import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "@/services/tickets-services";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await ticketService.getTicketTypes();

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const result = await ticketService.getTickets(userId);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;
  if (!ticketTypeId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const result = await ticketService.postTicket(userId, ticketTypeId);

    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

