import { parseError } from './ParseErrors';

describe('Parse Errors', () => {
  it('should parse error', () => {
    let errors = {
        'contactsDetailsSection.Fields[0].Name': [
          'The Name field is required.',
          'Some field is required.',
        ],
        'contactsDetailsSection.someField.anotherField': ['Some error'],
      },
      parsedErrors = parseError(errors);

    expect(parsedErrors.contactsDetailsSection.Fields[0].name).toBe(
      'The Name field is required.; Some field is required.'
    );
    expect(parsedErrors.contactsDetailsSection.someField.anotherField).toBe(
      'Some error'
    );
  });
});
