import LocationCapture from "@components/locationCapture";
import BottomButtons from "@components/ui/ButtonBarBackground";
import BackHeader from "@components/ui/HeaderBack";
import InputTextSelect from "@components/ui/inputTextSelect";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";

export default function TipoMaquina() {
  const router = useRouter();

  const campos = [
    {
      label: "Cliente/Responsável",
      placeholder: "Nome do Cliente ou Responsável",
      osField: "client",
    },
    {
      label: "Marca",
      placeholder: "Stara, John Deere, etc.",
      osField: "brand",
      options: [
        "Topcon",
        "Stara",
        "John Deere",
        "Massey Fergunson",
        "Valtra",
        "J.Assy",
        "Kuhn",
        "Trimble",
        "New Holland",
        "Fendt",
        "Case",
        "Jacto",
        "Raven",
      ],
    },
    {
      label: "Tipo de Máquina/Tipo Equipamento",
      placeholder: "Trator, Pulverizador, etc.",
      osField: "typeMachine",
      options: ["Trator", "Plantadeira", "Pulverizador", "Colheitadeira"],
    },
    {
      label: "Modelo da Máquina/Modelo do Equipamento",
      placeholder: "NAV900, SF3000, 9RX...",
      osField: "modelMachine",
      options: ["Corretiva", "Preventiva", "Preditiva"],
    },
    {
      label: "Número da Frota / Serial Number",
      placeholder: "Ex: 12345-AB",
      osField: "frotaNumber",
    },
    {
      label: "Tipo de Serviço",
      placeholder: "Manutenção, Instalação, Revisão...",
      osField: "typeService",
      options: [
        "Manutenção",
        "Instalação",
        "Inspeção",
        "Revisão",
        "Atualização",
      ],
    },
    {
      label: "Localização",
      placeholder: "Galpão 1, Pátio, Fazenda A, Fazenda B ,etc...",
      osField: "location",
    },
    {
      label: "Tipo de Manutenção",
      placeholder: "Corretiva, Preventiva...",
      osField: "maintanceType",
      options: ["Corretiva", "Preventiva", "Preditiva"],
    },
  ];

  const renderInputs = () => (
    <View style={styles.form}>
      <Text style={styles.title}>Preencha os campos</Text>

      {campos.map((campo, index) => (
        <View style={styles.input} key={index}>
          <InputTextSelect
            label={campo.label}
            placeholder={campo.placeholder}
            options={campo.options ?? []} // garante array vazio se undefined
            osField={campo.osField as any}
          />
        </View>
      ))}

      <LocationCapture />
    </View>
  );

  return (
    <View style={styles.container}>
      <BackHeader />
      <FlatList
        data={[]}
        ListHeaderComponent={renderInputs}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.contentContainer}
      />
      <BottomButtons onNext={() => router.push("/os/addTechnical")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  form: {
    padding: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
});
