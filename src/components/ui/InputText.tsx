import { useOs } from "@src/context/OsContext";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

type Props = {
  textInput?: string;
  textKeyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  osField?: keyof ReturnType<typeof useOs>["os"];
  defaultValue?: string;
};

export default function InputText({
  textInput,
  textKeyboardType = "default",
  osField,
  defaultValue = "",
}: Props) {
  const { setOs } = useOs();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (osField) {
      setOs({ [osField]: value });
    }
  }, [value]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={textInput}
        keyboardType={textKeyboardType}
        value={value}
        onChangeText={setValue}
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
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    width: 370,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
});
