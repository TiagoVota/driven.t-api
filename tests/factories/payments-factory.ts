import faker from '@faker-js/faker';
import dayjs from 'dayjs';

import { CreditCardBody } from '@/services/payments-service';

type FakePaymentBody = Partial<CreditCardBody>;

export function createPaymentBody(paymentBody?: FakePaymentBody) {
  return {
    name: paymentBody?.name || faker.name.findName(),
    number: paymentBody?.number || faker.finance.creditCardNumber('####-####-####-####'),
    expiry: paymentBody?.expiry || dayjs().add(3, 'year').format('MM/YY'),
    cvc: paymentBody?.cvc || faker.finance.creditCardCVV(),
    totalPrice: paymentBody?.totalPrice || faker.datatype.number({ min: 100 }),
  };
}
