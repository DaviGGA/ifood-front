export function formatToMoney(num: number) {
  return num.toLocaleString('pt-BR', {currency:"BRL", style: "currency"})
}