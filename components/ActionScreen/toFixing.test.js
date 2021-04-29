
import toFixing from "./toFixing"

describe('toFixing test:', () => {
  it('floor 1.125 with 0 decimal value', () => {
    decimal=toFixing(1.125,0);
    expect(decimal).toBe(1);
  });
  it('get floor 1.125 with 1 decimal value', () => {
    decimal=toFixing(1.125,1);
    expect(decimal).toBe(1.1);
  });
  it('get floor 1.125 with 2 decimal value', () => {
    decimal=toFixing(1.125,2);
    expect(decimal).toBe(1.12);
  });
  it('get floor 1.125 with 3 decimal value', () => {
    decimal=toFixing(1.125,3);
    expect(decimal).toBe(1.125);
  });
});