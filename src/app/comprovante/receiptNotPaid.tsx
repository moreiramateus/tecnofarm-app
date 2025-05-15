import LocationCapture from "@components/locationCapture";
import BottomButtons from "@components/ui/ButtonBarBackground";
import BackHeader from "@components/ui/HeaderBack";
import InputTextSelect from "@components/ui/inputTextSelect";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function receiptNotPaid() {
  const router = useRouter();

  const campos = [
    {
      label: "Categoria da Despesa",
      placeholder: "Alimentação, transporte, hospedagem...",
      osField: "",
      options: ["Alimentação", "Transporte", "Hospedagem"],
    },
    {
      label: "Valor Pago",
      placeholder: "Total da despesa no comprovante...",
      osField: "",
    },
    {
      label: "Forma de Pagamento",
      placeholder: "Dinheiro, Cartão de crédito, Pix...",
      osField: "",
      options: [
        "Dinheiro",
        "Cartão de Credito",
        "Cartão de Debito",
        "Transferência, Pix",
      ],
    },
    {
      label: "Descrição",
      placeholder: "Detalhes adicionais sobre a despesa...",
      osField: "",
      options: ["Corretiva", "Preventiva", "Preditiva"],
    },
    {
      label: "Usuário Responsável",
      placeholder: "Quem realizou a compra ou despesa...",
      osField: "",
      options: [],
    },
    {
      label: "Localização",
      placeholder: "Nome do estabelecimento...",
      osField: "location",
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
      <BottomButtons onNext={() => router.push("/")} />
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
