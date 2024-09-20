import { AccountType } from "@/types/AccountType";
import { useState, createContext, useContext } from "react";

type Provider = {
  accountId: string,
  accountType: AccountType | "",
  setAccountType: React.Dispatch<React.SetStateAction<"" | AccountType>>,
  setAccountId: React.Dispatch<React.SetStateAction<string>>
}

export const AccountCreateContext = createContext<Provider | null>(null);

export function AccountCreateProvider({children}: { children?: React.ReactNode }) {
  const [accountId, setAccountId] = useState<string>("");
  const [accountType, setAccountType] = useState<AccountType | "">("");

  return (
    <AccountCreateContext.Provider value={{accountId, setAccountId, accountType, setAccountType}}>
      {children}
    </AccountCreateContext.Provider>
  )
}

export const useAccountCreate = (): Provider => {
  const context = useContext(AccountCreateContext);
  if (!context) {
    throw new Error('useAccountId must be used within an AccountIdProvider');
  }
  return context;
};