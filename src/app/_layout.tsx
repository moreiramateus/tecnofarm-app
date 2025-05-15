import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { initializeDatabase } from "../database/initializeDatabase";

export default function Layout() {
  return (
    <SQLiteProvider databaseName="mydatabase.db" onInit={initializeDatabase}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <Stack
            screenOptions={{
              contentStyle: {
                backgroundColor: "#fff",
              },
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="encomenda" options={{ headerShown: false }} />
            <Stack.Screen name="os" options={{ headerShown: false }} />
            <Stack.Screen name="comprovante" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </SafeAreaView>
        <StatusBar />
      </SafeAreaProvider>
    </SQLiteProvider>
  );
}
