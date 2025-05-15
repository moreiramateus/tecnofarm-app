import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  onBack?: () => void;
};

export default function BottomButtonBack({ onBack }: Props) {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack || router.back}
        >
          <Ionicons name="arrow-back" size={24} color="#1C974B" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    paddingBottom: Platform.OS === "android" ? 10 : 0,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#1C974B",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    width: "100%",
  },
  backText: {
    color: "#1C974B",
    marginLeft: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
});
