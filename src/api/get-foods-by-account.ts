import { api } from "@/lib/axios";

export type GetFoodsByAccountResponse = {
  foodId: string, 
  name: string,
  image: string,
  price: number,
  discountedPrice: number,
  category: string,
  discount: number
}

export async function getFoodsByAccount(accountId: string) {
  return await api.get<GetFoodsByAccountResponse[]>(`/foods/${accountId}`);
}