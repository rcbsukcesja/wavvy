export function createApiDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month > 9 ? '' : '0'}${month}-${day > 9 ? '' : '0'}${day}`;
}
