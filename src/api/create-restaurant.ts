import { api } from "@/lib/axios";

export type createRestaurantBody = FormData

type createRestaurantResponse = {
  restaurantId: string
}

export async function createRestaurant(body: createRestaurantBody) {
  return await api.post<createRestaurantResponse>('/restaurants', body);
}