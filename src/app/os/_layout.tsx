import { OsProvider } from "@src/context/OsContext";
import { UsuariosProvider } from "@src/context/UsuariosContext";
import { Stack } from "expo-router";
import React from "react";

export default function OsLayout() {
  return (
    <OsProvider>
      <UsuariosProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#fff" },
            headerShown: false,
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            contentStyle: {
              backgroundColor: "#fff",
            },
          }}
        >
          <Stack.Screen
            name="descriptionService"
            options={{ title: "Descrição do Serviço" }}
          />
          <Stack.Screen
            name="resumeInitialOs"
            options={{ title: "Resumo Abertura OS" }}
          />
          <Stack.Screen
            name="resumeFinishOs"
            options={{ title: "Resumo Fechamento OS" }}
          />
          <Stack.Screen
            name="addTechnical"
            options={{ title: "Adicionar Técnico" }}d
          />
          <Stack.Screen
            name="cameraInitialOs"
            options={{ title: "Câmera Início OS" }}
          />
          <Stack.Screen
            name="cameraFinishOs"
            options={{ title: "Câmera Fim OS" }}
          />
          <Stack.Screen name="timer" options={{ title: "Timer" }} />
          <Stack.Screen
            name="addServiceList"
            options={{ title: "Adicionar Serviços" }}
          />
        </Stack>
      </UsuariosProvider>
    </OsProvider>
  );
}
