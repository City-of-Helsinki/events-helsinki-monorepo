import capitalize from '../capitalize';

describe('capitalize', () => {
  it('should capitalize the first letter', () => {
    expect(capitalize('test')).toStrictEqual('Test');
    expect(capitalize('Test')).toStrictEqual('Test');
    expect(capitalize('1est')).toStrictEqual('1est');
  });
});
