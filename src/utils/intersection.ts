export default function intersection(data: string[][]) {
  if (data.length === 1) {
    return data[0];
  }
  return data.reduce((a: string[], b: string[]) =>
    a.filter((c) => b.includes(c))
  );
}
