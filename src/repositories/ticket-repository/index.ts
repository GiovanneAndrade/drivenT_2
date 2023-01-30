import { prisma } from "@/config";
import { Ticket, TicketStatus } from "@prisma/client";
 
 
async function findTicketsTypes() {
  return prisma.ticketType.findMany();
}
async function getTicketsRepository(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}
async function postTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId,
      status: TicketStatus.RESERVED,
    },
  });
}

 
 

async function getTicketTypes() {
  return prisma.ticketType.findMany();
}

async function findTicket(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    }
  });
}
async function findTicketType(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    }
  });
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,  
    }
  });
}

async function createTicket(ticket: CreateTicketParams) {
  return prisma.ticket.create({
    data: {
      ...ticket,
    }
  });
}

async function ticketProcessPayment(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    }
  });
}

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">

const ticketRepository = {
  getTicketTypes,
  findTicketByEnrollmentId,
  createTicket,
  findTicket,
  findTicketType,
  ticketProcessPayment,
  findTicketsTypes,
  getTicketsRepository,
  postTicket,
};

export default ticketRepository;
