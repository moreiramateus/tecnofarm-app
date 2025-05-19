import React, { createContext, ReactNode, useContext, useState } from "react";

type ReceiptData = {
  brand?: string;
  typeMachine?: string;
  typeService?: string;
  client?: string;
  frotaNumber?: string;
  modelMachine?: string;
  modelEquipament?: string;
  brandEquipament?: string;
  technicalManager?: string;
  technicalAssistent?: string;
  fotoReceipt?: string | string[];
  fotoReceiptFinish?: string | string[];
  horaInicio?: string;
  horaFim?: string;
  serviceExecute?: string[];
  observationReceipt?: string;
  location?: string;
  geolocalizacao?: string;
  maintanceType?: string;
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
