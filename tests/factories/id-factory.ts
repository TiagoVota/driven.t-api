import faker from '@faker-js/faker';

export function generateId(isValid = true) {
  return isValid ? faker.datatype.number({ min: 1 }) : faker.datatype.number({ max: 0 });
}
