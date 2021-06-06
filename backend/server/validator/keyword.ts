export default function (keyword: string): boolean {
  const regex = RegExp("^[A-Za-z0-9-]{3,100}$");
  return regex.test(keyword);
}
