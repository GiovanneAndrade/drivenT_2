import { notFoundError, unauthorizedError } from '@/errors';
import paymentRepository, { PaymentParams } from '@/repositories/payments-repository';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function consultTicket(ticketId: number, userId: number) {
  const ticket = await ticketRepository.findTicket(ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  const enrollments = await enrollmentRepository.findById(ticket.enrollmentId);
  if (enrollments.userId !== userId) {
    throw unauthorizedError();
  }
}

async function getPayments(userId: number, ticketId: number) {
  await consultTicket(ticketId, userId);

  const payments = await paymentRepository.findPayment(ticketId);
  if (!payments) {
    throw notFoundError();
  }
  return payments;
}

async function processingPay(ticketId: number, userId: number, cardData: CardPaymentParams) {
  await consultTicket(ticketId, userId);

  const tickets = await ticketRepository.findTicketType(ticketId);

  const paymentData = {
    ticketId,
    value: tickets.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  const payments = await paymentRepository.postPayment(ticketId, paymentData);

  await ticketRepository.ticketProcessPayment(ticketId);

  return payments;
}

export type CardPaymentParams = {
  issuer: string;
  number: number;
  name: string;
  expirationDate: Date;
  cvv: number;
};

const paymentService = {
  getPayments,
  processingPay,
};

export default paymentService;
