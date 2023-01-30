import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { TicketStatus } from "@prisma/client";

async function getTicketTypes() {
  const result = await ticketRepository.getTicketTypes();

  if (!result) {
    throw notFoundError();
  }
  return result;
}

async function getTickets(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const resultTicket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!resultTicket) {
    throw notFoundError();
  }

  return resultTicket;
}

async function postTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticketData = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED
  };

  await ticketRepository.createTicket(ticketData);

  const result = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  return result;
}

const ticketService = {
  getTicketTypes,
  getTickets,
  postTicket
};

export default ticketService;
