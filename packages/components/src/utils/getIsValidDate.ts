export default function getIsDateValid(date: Date): boolean {
  return !Number.isNaN(date.getTime());
}
