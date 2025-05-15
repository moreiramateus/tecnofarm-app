import logoImage from "@assets/images/verdeTecnofarmLogo.png";
import MenuButton from "@components/MenuButton";
import React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => console.log("Voltar pressionado")}>
        <Image source={logoImage} style={styles.logo} resizeMode="contain" />
      </TouchableOpacity>
      <MenuButton />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#011D23",
    height: (StatusBar.currentHeight || 0) + 56,
  },
  logo: {
    marginTop: 25,
    marginBottom: 25,
    marginLeft: 25,
    width: 32,
    height: 32,
  },
  menu: {
    marginTop: 25,
    marginBottom: 25,
    marginRight: 25,
    width: 32,
    height: 32,
  },
});
