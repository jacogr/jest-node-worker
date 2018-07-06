const add = require('./index');

describe('worker test', () => {
  it('sends message to worker, retrieves result', () => {
    expect(
      add(13, 29)
    ).toEqual(42);
  });
});
