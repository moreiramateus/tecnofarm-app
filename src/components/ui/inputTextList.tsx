import { useOs } from "@src/context/OsContext";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

type Props = {
  placeholder?: string;
  textKeyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
};

export default function InputTextList({
  placeholder,
  textKeyboardType = "default",
}: Props) {
  const { setOs, os } = useOs();
  const [text, setText] = useState(os.observationOs || "");

  useEffect(() => {
    setOs({ observationOs: text });
  }, [text]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder || "Digite suas observações..."}
        keyboardType={textKeyboardType}
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={10}
        textAlignVertical="top"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    padding: 20,
    width: 360,
    height: 226,
    fontSize: 16,
    borderRadius: 8,
  },
});
