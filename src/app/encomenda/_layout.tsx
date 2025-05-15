import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export default function CorreiosLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#1e40af" },
          headerShown: false,
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="destinatario"
          options={{
            title: "Destinatário",
          }}
        />
        <Stack.Screen
          name="etiqueta"
          options={{
            title: "Etiqueta",
          }}
        />
        <Stack.Screen
          name="resumo"
          options={{
            title: "Resumo",
          }}
        />
        <Stack.Screen
          name="gerarEtiqueta"
          options={{
            title: "Gerar Etiqueta",
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
