import { api } from "@/lib/axios";

type createFoodBody = FormData

type createFoodResponse = {
  foodId: string
}

export async function createFood(body: createFoodBody) {
  return await api.post<createFoodResponse>('/foods', body);
}