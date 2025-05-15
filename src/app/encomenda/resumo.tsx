import BottomButtons from "@/components/ui/ButtonBarBackground";
import BackHeader from "@/components/ui/HeaderBack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

export default function CorreiosScreen() {
  const router = useRouter();
  const [destinatario, setDestinatario] = useState<any | null>(null);

  useEffect(() => {
    const carregarDestinatario = async () => {
      const data = await AsyncStorage.getItem("usuarioSelecionado");
      if (data) {
        setDestinatario(JSON.parse(data));
      }
    };

    carregarDestinatario();
  }, []);

  if (!destinatario) {
    return (
      <SafeAreaView style={styles.container}>
        <BackHeader onPress={() => router.back()} />
        <Text style={styles.title}>Carregando dados...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader onPress={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Resumo do Destinatário</Text>
        {Object.entries(destinatario).map(([key, value]) => (
          <View key={key} style={styles.infoBox}>
            <Text style={styles.label}>{key.toUpperCase()}:</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </ScrollView>
      <BottomButtons
                onNext={()=>router.push('./etiqueta')}
                onBack={() => router.back()}
                nextLabel="Avançar"
              />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    padding: 20,
    paddingBottom: 100,
    backgroundColor:"white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoBox: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#444",
  },
  value: {
    color: "#222",
    fontSize: 16,
  },
});
