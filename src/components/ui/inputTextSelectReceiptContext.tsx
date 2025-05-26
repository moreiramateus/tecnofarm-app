import { useReceipt } from "@src/context/ReceiptContext";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

type InputType = "text" | "money";

type Props = {
  label?: string;
  options: string[];
  receiptField?: keyof ReturnType<typeof useReceipt>["receipt"];
  placeholder?: string;
  inputType?: InputType;
};

export default function InputTextSelect({
  label,
  options,
  receiptField,
  placeholder = "Digite ou selecione",
  inputType = "text",
}: Props) {
  const { setReceipt } = useReceipt();
  const [value, setValue] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleChange = (text: string, rawValue?: string) => {
    setValue(text);

    if (receiptField && inputType === "money" && rawValue !== undefined) {
      const centavos = parseInt(rawValue, 10);
      const floatValue = centavos / 100;

      if (!isNaN(floatValue)) {
        setReceipt({ [receiptField]: floatValue });
      }
      return;
    }

    if (receiptField && inputType !== "money") {
      setReceipt({ [receiptField]: text });
    }

    const baseValue = text;

    if (baseValue.trim().length === 0) {
      setShowOptions(false);
      return;
    }

    const result = options.filter((op) =>
      op.toLowerCase().includes(baseValue.toLowerCase())
    );

    setFiltered(result);
    setShowOptions(result.length > 0);
  };

  const handleSelect = (item: string) => {
    setValue(item);
    setShowOptions(false);

    if (receiptField) {
      setReceipt({ [receiptField]: item });
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      {inputType === "money" ? (
        <MaskedTextInput
          type="currency"
          options={{
            prefix: "R$ ",
            decimalSeparator: ",",
            groupSeparator: ".",
            precision: 2,
          }}
          value={value}
          onChangeText={(text, rawValue) => handleChange(text, rawValue)}
          keyboardType="numeric"
          style={styles.input}
          placeholder={placeholder}
        />
      ) : (
        <MaskedTextInput
          mask=""
          value={value}
          onChangeText={(text) => handleChange(text)}
          style={styles.input}
          placeholder={placeholder}
        />
      )}

      {showOptions && (
        <View style={styles.dropdownWrapper}>
          <FlatList
            data={filtered}
            keyExtractor={(item) => item}
            style={styles.dropdown}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={styles.option}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    maxWidth: 380,
    alignSelf: "center",
    zIndex: 10,
  },
  label: {
    fontWeight: "bold",
    marginLeft: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  dropdownWrapper: {
    marginTop: 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    maxHeight: 150,
    backgroundColor: "#fff",
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
  },
});
