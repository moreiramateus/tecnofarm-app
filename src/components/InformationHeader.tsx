import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function HeaderInformation() {
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require("@assets/images/scrollImage.png")}
        style={styles.image}
        resizeMode="cover"
      >
        <Text style={styles.text}>Olá, Admin!</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 150,
    overflow: "hidden", // importante para cortar o excesso da imagem
  },
  image: {
    height: 200, // maior que o wrapper
    width: "100%",
    justifyContent: "flex-start",
    bottom:50,
  },
  text: {
    padding: 20,
    marginTop:35,
    fontSize: 28,
    color: "white",
    fontWeight: "600",
    fontFamily:"Barlow-R"
  },
});
