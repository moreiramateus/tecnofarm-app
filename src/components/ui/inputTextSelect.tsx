import { useOs } from "@src/context/OsContext";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  label?: string;
  options: string[];
  osField?: keyof ReturnType<typeof useOs>["os"];
  placeholder?: string;
};

export default function InputTextSelect({
  label,
  options,
  osField,
  placeholder = "Digite ou selecione",
}: Props) {
  const { setOs } = useOs();
  const [value, setValue] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (osField && value.trim() !== "") {
      setOs({ [osField]: value });
    }
  }, [value]);

  const handleChange = (text: string) => {
    setValue(text);
    if (text.trim().length === 0) {
      setShowOptions(false);
      return;
    }
    const result = options.filter((op) =>
      op.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(result);
    setShowOptions(result.length > 0);
  };

  const handleSelect = (item: string) => {
    setValue(item);
    setShowOptions(false);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={handleChange}
        placeholder={placeholder}
      />
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
