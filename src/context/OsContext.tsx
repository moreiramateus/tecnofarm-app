import React, { createContext, ReactNode, useContext, useState } from "react";

type OsData = {
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
  fotoOS?: string | string[];
  fotoOSFinish?: string | string[];
  horaInicio?: string;
  horaFim?: string;
  serviceExecute?: string[];
  observationOs?: string;
  location?: string;
  geolocalizacao?: string;
  maintanceType?: string;
};

type OsContextType = {
  os: OsData;
  setOs: (data: Partial<OsData>) => void;
  resetOs: () => void;
};

// Corrigido: nome do contexto
const OsContext = createContext<OsContextType>({} as OsContextType);

export const OsProvider = ({ children }: { children: ReactNode }) => {
  const [os, setOsState] = useState<OsData>({});

  const setOs = (data: Partial<OsData>) => {
    setOsState((prev) => ({ ...prev, ...data }));
  };

  const resetOs = () => {
    setOsState({});
  };

  return (
    <OsContext.Provider value={{ os, setOs, resetOs }}>
      {children}
    </OsContext.Provider>
  );
};

export const useOs = () => useContext(OsContext);
