import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

type Props = {
  options: string[];
  buttonLabel?: string;
};

export default function MultiSelectButton({ options, buttonLabel = "Selecionar Opções" }: Props) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (item: string) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
    setShowOptions(false);
  };

  const handleRemove = (item: string) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setShowOptions(!showOptions)}
      >
        <Text style={styles.buttonText}>{buttonLabel}</Text>
      </TouchableOpacity>

      {showOptions && (
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => handleSelect(option)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.selectedContainer}>
        {selectedItems.map((item) => (
          <View key={item} style={styles.selectedItem}>
            <Text style={styles.selectedText}>{item}</Text>
            <TouchableOpacity onPress={() => handleRemove(item)}>
              <Ionicons name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  selectButton: {
    backgroundColor: "#1C974B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  optionsContainer: {
    backgroundColor: "#eee",
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 5,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedContainer: {
    marginTop: 20,
  },
  selectedItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
  },
  selectedText: {
    fontSize: 16,
  },
});
