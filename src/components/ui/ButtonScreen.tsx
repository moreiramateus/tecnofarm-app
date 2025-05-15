import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  icon?: string;
  colorIcon?: string;
  arrowIcon?: string;
  colorArrowIcon?: string;
  route?: string;
};

export default function ButtonScreen({
  title,
  subtitle = "2 tasks",
  icon = "moon",
  backgroundColor = "#2196F3",
  colorIcon = "black",
  arrowIcon = "chevron-forward",
  colorArrowIcon = "white",
  route = "/",
}: Props) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(route)}
      style={[styles.container, { backgroundColor }]}
    >
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <Ionicons name={icon as any} size={26} color={colorIcon as any} />
        </View>
        <Ionicons
          name={arrowIcon as any}
          size={26}
          color={colorArrowIcon as any}
        />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 120,
    borderRadius: 12,
    padding: 12,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "white",
    borderRadius: 999,
    padding: 8,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Barrow-Bold",
    marginTop: 5,
  },
  subtitle: {
    color: "#e0f0ff",
    fontSize: 12,
  },
});
