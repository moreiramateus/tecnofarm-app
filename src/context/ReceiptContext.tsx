import React, { createContext, ReactNode, useContext, useState } from "react";

type ReceiptData = {
  category?: string;
  fotoReceipt?: string | string[];
  paidValue?: string;
  paymentMethod?: string;
  description?: string;
  userResponsible?: string;
};

type ReceiptContextType = {
  receipt: ReceiptData;
  setReceipt: (data: Partial<ReceiptData>) => void;
  resetReceipt: () => void;
};

const ReceiptContext = createContext<ReceiptContextType>(
  {} as ReceiptContextType
);

export const ReceiptProvider = ({ children }: { children: ReactNode }) => {
  const [receipt, setReceiptState] = useState<ReceiptData>({});

  const setReceipt = (data: Partial<ReceiptData>) => {
    setReceiptState((prev) => ({ ...prev, ...data }));
  };

  const resetReceipt = () => {
    setReceiptState({});
  };

  return (
    <ReceiptContext.Provider value={{ receipt, setReceipt, resetReceipt }}>
      {children}
    </ReceiptContext.Provider>
  );
};

export const useReceipt = () => useContext(ReceiptContext);
