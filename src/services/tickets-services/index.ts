import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { Ticket, TicketStatus } from '@prisma/client';
import ticketsRepository from '@/repositories/ticket-repository';

import ticketRepository from '@/repositories/ticket-repository';

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
    status: TicketStatus.RESERVED,
  };

  await ticketRepository.createTicket(ticketData);

  const result = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  return result;
}

async function findTicketsTypes() {
  const ticketsTypes = await ticketsRepository.findTicketsTypes();

  if (!ticketsTypes) {
    throw notFoundError;
  }
  return ticketsTypes;
}

async function getTicketsEnrollmentsId(userId: number) {
  const enrollments = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollments) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.getTicketsRepository(enrollments.id);
  if (!ticket) {
    throw notFoundError();
  }
  return ticket;
}

async function postTicketsServices(userId: number, ticketTypeId: number) {
  const enrollments = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollments) {
    throw notFoundError();
  }

  const enrollmentId = enrollments.id;

  await ticketsRepository.postTicket(ticketTypeId, enrollmentId);
  const ticket = await ticketsRepository.getTicketsRepository(enrollments.id);

  return ticket;
}

const ticketsService = {
  findTicketsTypes,
  getTicketsEnrollmentsId,
  postTicketsServices,
  getTicketTypes,
  getTickets,
  postTicket,
};

export default ticketsService;
