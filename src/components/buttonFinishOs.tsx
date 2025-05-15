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
  onFinish?: () => void;
};

export default function BottomButtonFinish({ onFinish }: Props) {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.finishButton}
          onPress={onFinish || (() => router.push("/"))}
        >
          <Ionicons name="checkmark" size={24} color="#fff" />
          <Text style={styles.finishText}>Finalizar</Text>
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
    marginHorizontal: 20,
    marginBottom: 10,
  },
  finishButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1C974B",
    borderRadius: 50,
    paddingVertical: 12,
    width: "100%",
  },
  finishText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
});
