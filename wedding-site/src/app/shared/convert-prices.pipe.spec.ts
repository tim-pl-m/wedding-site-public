import { ConvertPricesPipe } from './convert-prices.pipe';

describe('ConvertPricesPipe', () => {
  it('create an instance', () => {
    const pipe = new ConvertPricesPipe();
    expect(pipe).toBeTruthy();
  });
});
