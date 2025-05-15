import BottomButtons from "@components/ui/ButtonBarBackground";
import BackHeader from "@components/ui/HeaderBack";
import { useOs } from "@src/context/OsContext";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ResumeOS() {
  const { os } = useOs();
  const router = useRouter();

  const renderItem = (label: string, value?: string) => (
    <View style={styles.item}>
      <Text style={styles.label}>
        {label}: <Text style={styles.value}>{value || "—"}</Text>
      </Text>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <BackHeader />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Resumo da Abertura da O.S.</Text>

        {renderItem("Cliente/Responsável", os.client)}
        {renderItem("Marca", os.brand)}
        {renderItem("Tipo de Máquina/Equipamento", os.typeMachine)}
        {renderItem("Modelo da Máquina/Modelo do Equipamento", os.modelMachine)}
        {renderItem("Número da Frota / Serial", os.frotaNumber)}
        {renderItem("Tipo de Serviço", os.typeService)}
        {renderItem("Tipo de Manutenção", os.maintanceType)}
        {renderItem("Responsável Técnico", os.technicalManager)}
        {renderItem("Técnicos Auxiliares", os.technicalAssistent)}
        {renderItem("Localização", os.location)}
        {renderItem("Localização Abertura O.S", os.geolocalizacao)}
      </ScrollView>

      <BottomButtons onNext={() => router.push("/os/cameraInitialOs")} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
    gap: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
  },
  item: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#555",
  },
});
