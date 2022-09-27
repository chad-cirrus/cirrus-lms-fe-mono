import { totalFlightHoursString } from './totalFlightHoursString';

describe('total flight hours string', () => {
  it("0 should return '0000'", () => {
    const actual = totalFlightHoursString(0);
    expect(actual).toBe('0000');
  });

  it("+'0' should return '0000'", () => {
    const zero = '0';
    const plusZero = +zero;
    const actual = totalFlightHoursString(plusZero);
    expect(actual).toBe('0000');
  });

  it("+0 should return '0000'", () => {
    const zero = 0;
    const plusZero = +zero;
    const actual = totalFlightHoursString(plusZero);
    expect(actual).toBe('0000');
  });

  it("1 should return '0001'", () => {
    const actual = totalFlightHoursString(1);
    expect(actual).toBe('0001');
  });

  it("+'9' should return '0009'", () => {
    const nine = '9';
    const plusNine = +nine;
    const actual = totalFlightHoursString(plusNine);
    expect(actual).toBe('0009');
  });

  it("+5 should return '0005'", () => {
    const five = 5;
    const plusFive = +five;
    const actual = totalFlightHoursString(plusFive);
    expect(actual).toBe('0005');
  });

  it("11 should return '0011'", () => {
    const actual = totalFlightHoursString(11);
    expect(actual).toBe('0011');
  });

  it("+'99' should return '0099'", () => {
    const nine = '99';
    const plusNine = +nine;
    const actual = totalFlightHoursString(plusNine);
    expect(actual).toBe('0099');
  });

  it("+5 should return '0055'", () => {
    const five = 55;
    const plusFive = +five;
    const actual = totalFlightHoursString(plusFive);
    expect(actual).toBe('0055');
  });

  it("111 should return '0111'", () => {
    const actual = totalFlightHoursString(111);
    expect(actual).toBe('0111');
  });

  it("+'999' should return '0999'", () => {
    const nine = '999';
    const plusNine = +nine;
    const actual = totalFlightHoursString(plusNine);
    expect(actual).toBe('0999');
  });

  it("+555 should return '0555'", () => {
    const five = 555;
    const plusFive = +five;
    const actual = totalFlightHoursString(plusFive);
    expect(actual).toBe('0555');
  });

  it("1111 should return '1111'", () => {
    const actual = totalFlightHoursString(1111);
    expect(actual).toBe('1111');
  });

  it("+'9999' should return '9999'", () => {
    const nine = '9999';
    const plusNine = +nine;
    const actual = totalFlightHoursString(plusNine);
    expect(actual).toBe('9999');
  });

  it("+5555 should return '5555'", () => {
    const five = 5555;
    const plusFive = +five;
    const actual = totalFlightHoursString(plusFive);
    expect(actual).toBe('5555');
  });
});
