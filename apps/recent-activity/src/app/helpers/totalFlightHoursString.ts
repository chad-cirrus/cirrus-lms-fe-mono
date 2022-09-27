export const totalFlightHoursString = (hours: number): string => {
  return String(hours).padStart(4, '0');
};
