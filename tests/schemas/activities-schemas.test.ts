import faker from '@faker-js/faker';

import { activityInscriptionSchema as sut } from '@/schemas';

import { generateId } from '../factories';

describe('activityInscriptionSchema', () => {
  describe('when activityId is not valid', () => {
    it('should return error if activityId is not present', () => {
      const params = {};

      const { error } = sut.validate(params);

      expect(error).toBeDefined();
    });

    it('should return error if activityId is not a integer', () => {
      const params = {
        activityId: faker.datatype.number({ precision: 0.42 }),
      };

      const { error } = sut.validate(params);

      expect(error).toBeDefined();
    });

    it('should return error if activityId is lower than 1', () => {
      const params = {
        activityId: faker.datatype.number({ min: -42, max: 0 }),
      };

      const { error } = sut.validate(params);

      expect(error).toBeDefined();
    });
  });

  it('should return no error if params is valid', () => {
    const params = {
      activityId: generateId(),
    };

    const { error } = sut.validate(params);

    expect(error).toBeUndefined();
  });
});
