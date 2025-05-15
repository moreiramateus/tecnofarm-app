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
  onNext?: () => void;
  onBack?: () => void;
  nextLabel?: string; // <- adiciona o texto customizável
};

export default function BottomButtons({ onNext, onBack, nextLabel = "Avançar" }: Props) {
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

        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextText}>{nextLabel}</Text>
          <Ionicons name="arrow-forward" size={24} color="#fff" />
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
    width: 150,
  },
  backText: {
    color: "#1C974B",
    marginLeft: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1C974B",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 190,
  },
  nextText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 8,
  },
});
