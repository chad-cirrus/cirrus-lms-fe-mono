import { NameToInitialsPipe } from './NameToInitialsPipe';

describe('NameToInitialsPipe', () => {
  let pipe: NameToInitialsPipe;

  beforeEach(() => {
    pipe = new NameToInitialsPipe();
  });

  it('should transform "Michael de Scott" to "MS"', () => {
    expect(pipe.transform('Michael de Scott')).toBe('MS');
  });

  it('should transform "Micahel" to "M"', () => {
    expect(pipe.transform('Michael')).toBe('M');
  });

  it('should handle names with extra spaces correctly', () => {
    expect(pipe.transform(' Michael  Scott ')).toBe('MS');
  });

  it('should return an empty string for an empty string input', () => {
    expect(pipe.transform('')).toBe('');
  });
});