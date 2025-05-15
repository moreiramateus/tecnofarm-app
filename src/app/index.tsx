import ButtonScreen from "@/components/ui/ButtonScreen";
import Header from "@/components/ui/TabHomeScreen";
import HeaderInformation from "@components/InformationHeader";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style = {styles.container}>
      <Header />
      <HeaderInformation />
      <View style={styles.grid}>
        <ButtonScreen
          title="Entrada de equipamentos"
          subtitle=""
          icon="add-circle-outline"
          colorIcon="#1C974B"
          backgroundColor="#1C974B"
          route="/"
        />

        <ButtonScreen
          title="Registrar O.S"
          subtitle=""
          icon="clipboard-outline"
          colorIcon="#1C974B"
          backgroundColor="#1C974B"
          route="/os/inputList"
        />

        <ButtonScreen
          title="Comprovantes"
          subtitle=""
          icon="card-outline"
          colorIcon="#1C974B"
          backgroundColor="#1C974B"
        />

        <ButtonScreen
          title="Ocorrências"
          subtitle=""
          icon="warning-outline"
          colorIcon="#FC1723"
          backgroundColor="#FC1723"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FFF5", // escuro como na imagem
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    rowGap: 20,
    columnGap: 20,
    padding: 16,
  },
});
