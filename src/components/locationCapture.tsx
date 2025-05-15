import { useLocationCapture } from "@hooks/useLocationCapture";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LocationCapture() {
  const { coords, loading, capturarLocalizacao } = useLocationCapture();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Localização:</Text>
      <Text style={styles.value}>{coords || "Ainda não capturada"}</Text>

      <TouchableOpacity style={styles.button} onPress={capturarLocalizacao}>
        <Text style={styles.buttonText}>
          {loading ? "Obtendo localização..." : "Obter Localização"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  value: {
    fontSize: 14,
    marginBottom: 12,
    color: "#444",
  },
  button: {
    backgroundColor: "#1C974B",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
