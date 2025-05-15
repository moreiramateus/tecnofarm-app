import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";

type Props = {
  onPress?: () => void;
};

export default function BackHeader({ onPress }: Props) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.icon}>
        <Ionicons
          name="arrow-back"
          size={32}
          color="white"
          onPress={onPress || (() => router.back())}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#011D23",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    height: (StatusBar.currentHeight || 0) + 56,
  },
  icon: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
});
