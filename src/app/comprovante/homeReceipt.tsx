import HeaderInformation from "@components/InformationHeader";
import BottomButtonBack from "@components/ui/ButtonBarBackgroundBack";
import ButtonScreen from "@components/ui/ButtonScreen";
import BackHeader from "@components/ui/HeaderBack";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <BackHeader />
      <HeaderInformation />
      <View style={styles.grid}>
        <ButtonScreen
          title="Comprovantes"
          subtitle=""
          icon="card-outline"
          colorIcon="#1C974B"
          backgroundColor="#1C974B"
          route="comprovante/receiptPaid"
        />
        <ButtonScreen
          title="Compras a prazo"
          subtitle=""
          icon="hourglass-outline"
          colorIcon="#1C974B"
          backgroundColor="#1C974B"
          route="comprovante/receiptNotPaid"
        />
        <ButtonScreen
          title="Reembolso"
          subtitle=""
          icon="cash-outline"
          colorIcon="#1C974B"
          backgroundColor="#1C974B"
          route="comprovante/reimbursement"
        />
        <ButtonScreen
          title="Gerenciar Comprovantes"
          subtitle=""
          icon="file-tray-full-outline"
          colorIcon="#1C974B"
          backgroundColor="#1C974B"
          route="comprovante/receiptHistory"
        />
      </View>
      <BottomButtonBack />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FFF5", // escuro como na imagem
  },
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    rowGap: 20,
    columnGap: 20,
    padding: 16,
  },
});
