import faker from '@faker-js/faker';

import { creditCardInfoSchema as sut } from '@/schemas';

import { createPaymentBody } from '../factories';

describe('creditCardInfoSchema', () => {
  describe('when name is not valid', () => {
    it('should return error if name is not present', () => {
      const input = createPaymentBody();
      delete input.name;

      const { error } = sut.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if name is shorter than 5 characters', () => {
      const input = createPaymentBody();
      input.name = faker.lorem.word(4);

      const { error } = sut.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if name is larger than 255 characters', () => {
      const input = createPaymentBody();
      input.name = faker.lorem.word(256);

      const { error } = sut.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe('when number is not valid', () => {
    it('should return error if number is not present', () => {
      const input = createPaymentBody();
      delete input.number;

      const { error } = sut.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if number is shorter than 14 characters', () => {
      const input = createPaymentBody();
      input.number = faker.lorem.word(13);

      const { error } = sut.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if number is larger than 19 characters', () => {
      const input = createPaymentBody();
      input.number = faker.lorem.word(20);

      const { error } = sut.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe('when expiry is not valid', () => {
    it('should return error if expiry is not present', () => {
      const input = createPaymentBody();
      delete input.expiry;

      const { error } = sut.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if expiry is shorter than 4 characters', () => {
      const input = createPaymentBody();
      input.expiry = faker.lorem.word(3);

      const { error } = sut.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if expiry is larger than 5 characters', () => {
      const input = createPaymentBody();
      input.expiry = faker.lorem.word(6);

      const { error } = sut.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe('when cvc is not valid', () => {
    it('should return error if cvc is not present', () => {
      const input = createPaymentBody();
      delete input.cvc;

      const { error } = sut.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if cvc is shorter than 3 characters', () => {
      const input = createPaymentBody();
      input.cvc = faker.lorem.word(2);

      const { error } = sut.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if cvc is larger than 4 characters', () => {
      const input = createPaymentBody();
      input.cvc = faker.lorem.word(5);

      const { error } = sut.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe('when totalPrice is not valid', () => {
    it('should return error if totalPrice is not present', () => {
      const input = createPaymentBody();
      delete input.totalPrice;

      const { error } = sut.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if totalPrice is not a integer', () => {
      const input = createPaymentBody();
      input.totalPrice = faker.datatype.number({ precision: 0.1 });

      const { error } = sut.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if totalPrice is lower than 1', () => {
      const input = createPaymentBody();
      input.totalPrice = faker.datatype.number({ max: 0 });

      const { error } = sut.validate(input);

      expect(error).toBeDefined();
    });
  });

  it('should return no error if input is valid', () => {
    const input = createPaymentBody();

    const { error } = sut.validate(input);

    expect(error).toBeUndefined();
  });
});
