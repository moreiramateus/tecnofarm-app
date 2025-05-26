import InputTextSelect from "@/components/ui/inputTextSelectReceiptContext";
import BottomButtons from "@components/ui/ButtonBarBackground";
import BackHeader from "@components/ui/HeaderBack";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

type CampoInput = {
  label: string;
  placeholder: string;
  receiptField: string;
  options?: string[];
  inputType?: "text" | "money";
};

export default function ReceiptPaid() {
  const router = useRouter();

  const campos: CampoInput[] = [
    {
      label: "Categoria da Despesa",
      placeholder: "Alimentação, transporte, hospedagem...",
      receiptField: "category",
      options: ["Alimentação", "Transporte", "Hospedagem"],
    },
    {
      label: "Valor Pago",
      placeholder: "Total da despesa no comprovante...",
      receiptField: "paidValue",
      inputType: "money",
    },
    {
      label: "Forma de Pagamento",
      placeholder: "Dinheiro, Cartão de crédito, Pix...",
      receiptField: "paymentMethod",
      options: [
        "Dinheiro",
        "Cartão de Credito",
        "Cartão de Debito",
        "Transferência",
        "Pix",
      ],
    },
    {
      label: "Descrição",
      placeholder: "Detalhes adicionais sobre a despesa...",
      receiptField: "description",
      options: [""],
    },
    {
      label: "Usuário Responsável",
      placeholder: "Quem realizou a compra ou despesa...",
      receiptField: "userResponsible",
      options: [],
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
            options={campo.options ?? []}
            receiptField={campo.receiptField as any}
            inputType={campo.inputType ?? "text"}
          />
        </View>
      ))}
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
      <BottomButtons onNext={() => router.push("/comprovante/cameraReceipt")} />
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
    fontWeight: "bold",
  },
  input: {
    marginBottom: 20,
  },
});
