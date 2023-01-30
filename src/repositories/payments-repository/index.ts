import { prisma } from '@/config';
import { TicketStatus } from '@prisma/client';
 
import { Payment } from '@prisma/client';

async function findPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function postPayment(ticketId: number, params: PaymentParams) {
  return prisma.payment.create({
    data: {
      ticketId,
      ...params,
    },
  });
}

export type PaymentParams = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

 



async function getPayments(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function getTicketById(id: number) {
  const result = await prisma.ticket.findUnique({ where: { id } });

  return result;
}
async function getEnrollmentById(id: number) {
  const result = prisma.enrollment.findUnique({ where: { id } });

  return result;
}

async function getPaymentByTicketId(ticketId: number) {
  const result = await prisma.ticketType.findFirst({
    where: {
      id: ticketId,
    },
  });

  return result;
}
async function insertPaymentData(ticketId: number, cardData: any, value: number, lastNumberString: string) {
  return prisma.payment.create({
    data: {
      ticketId,
      cardIssuer: cardData.issuer,
      cardLastDigits: lastNumberString,
      value: value,
    },
  });
}

async function updateTicket(id: number) {
  return prisma.ticket.update({
    where: { id },
    data: {
      status: 'PAID',
    },
  });
}

async function postPayments(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}
const paymentsRepository = {
  getPayments,
  postPayments,
  getTicketById,
  getEnrollmentById,
  getPaymentByTicketId,
  insertPaymentData,
  updateTicket,
  findPayment,
  postPayment,
};

export default paymentsRepository;
