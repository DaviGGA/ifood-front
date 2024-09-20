import { api } from "@/lib/axios";

type createAccountBody = {
  email: string,
  password: string,
  confirmPassword: string
}

type createAccountResponse = {
  accountId: string
}

export async function createAccount(body: createAccountBody) {
  return await api.post<createAccountResponse>('/accounts', body);
}