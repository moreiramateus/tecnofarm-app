import { ReceiptProvider } from "@/context/ReceiptContext";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export default function ReceiptLayout() {
  return (
    <ReceiptProvider>
      <SafeAreaView style={styles.container}>
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
            name="homeReceipt"
            options={{
              title: "Home Comprovantes",
            }}
          />
          <Stack.Screen
            name="receiptNotPaid"
            options={{
              title: "Recibo com prazo",
            }}
          />

          <Stack.Screen
            name="receiptPaid"
            options={{
              title: "Recibo Pago",
            }}
          />
          <Stack.Screen
            name="receiptHistory"
            options={{
              title: "Historico",
            }}
          />
          <Stack.Screen
            name="reimbursement"
            options={{
              title: "Reembolso",
            }}
          />
          <Stack.Screen
            name="cameraReceipt"
            options={{
              title: "Camera",
            }}
          />
          <Stack.Screen
            name="resumeReceipt"
            options={{
              title: "Resumo",
            }}
          />
        </Stack>
      </SafeAreaView>
    </ReceiptProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
