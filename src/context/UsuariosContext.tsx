import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

type UsuariosContextType = {
  assistentes: string[];
  gerentes: string[];
  adicionarAssistente: (nome: string) => void;
  adicionarGerente: (nome: string) => void;
  removerAssistente: (nome: string) => void;
  removerGerente: (nome: string) => void;
  resetUsuarios: () => void;
};

const UsuariosContext = createContext<UsuariosContextType>({} as UsuariosContextType);

export const UsuariosProvider = ({ children }: { children: ReactNode }) => {
  const [assistentes, setAssistentes] = useState<string[]>([]);
  const [gerentes, setGerentes] = useState<string[]>([]);

  const STORAGE_KEY = "@usuarios_os";

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((dados) => {
      if (dados) {
        const { assistentes = [], gerentes = [] } = JSON.parse(dados);
        setAssistentes(assistentes);
        setGerentes(gerentes);
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ assistentes, gerentes })
    );
  }, [assistentes, gerentes]);

  const adicionarAssistente = (nome: string) => {
    if (nome.trim() && !assistentes.includes(nome.trim())) {
      setAssistentes((prev) => [...prev, nome.trim()]);
    }
  };

  const adicionarGerente = (nome: string) => {
    if (nome.trim() && !gerentes.includes(nome.trim())) {
      setGerentes((prev) => [...prev, nome.trim()]);
    }
  };

  const removerAssistente = (nome: string) => {
    setAssistentes((prev) => prev.filter((n) => n !== nome));
  };

  const removerGerente = (nome: string) => {
    setGerentes((prev) => prev.filter((n) => n !== nome));
  };

  const resetUsuarios = () => {
    setAssistentes([]);
    setGerentes([]);
  };

  return (
    <UsuariosContext.Provider
      value={{
        assistentes,
        gerentes,
        adicionarAssistente,
        adicionarGerente,
        removerAssistente,
        removerGerente,
        resetUsuarios,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};

export const useUsuarios = () => useContext(UsuariosContext);
