import { createTicketSchema } from '@/schemas';

describe('createTicketSchema', () => {
  describe('when modalityId is not valid', () => {
    it('should return error if modalityId is not a number', () => {
      const input = {
        modalityId: 'foo',
      };
      const { error } = createTicketSchema.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if modalityId is empty', () => {
      const input = {
        modalityId: 'foo',
      };
      delete input.modalityId;
      const { error } = createTicketSchema.validate(input);

      expect(error).toBeDefined();
    });
  });
});
