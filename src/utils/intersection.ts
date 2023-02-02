export default function intersection<T>(data: T[][]) {
  if (data.length === 1) {
    return data;
  }
  return data.reduce((a: T[], b: T[]) => a.filter((c) => b.includes(c)));
}
