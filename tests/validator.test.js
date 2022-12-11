const validator = require('../src/middleware/validator');

describe('Validator', () => {
  test('With name Gandalf', () => {
    const req = { query: { name: 'Gandalf' } };
    const next = jest.fn();

    validator(req, {}, next);

    expect(req.name).toBe('Gandalf');
    expect(next).toHaveBeenCalled();
  });

  test('With no name', () => {
    const req = { query: {} };
    const next = jest.fn();

    validator(req, {}, next);

    expect(next).toHaveBeenCalledWith('Unable to validate. No name given.');
  });
});
