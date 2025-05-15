import { useOs } from "@ssrc/context/OsContext";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  backgroundColor?: string;
  image: any;
  route?: string;
  title?: string;
  titleColor?: string;
  osField?: keyof ReturnType<typeof useOs>["os"]; // tipo seguro
  osValue?: string;
};

export default function ButtonScreenImage({
  backgroundColor = "#2196F3",
  image,
  route = "/",
  title,
  titleColor = "black",
  osField,
  osValue,
}: Props) {
  const router = useRouter();
  const { setOs } = useOs();

  const [loaded] = useFonts({
    BarlowSemiBold: require("@/assets/fonts/Barlow-SemiBold.ttf"),
    BarlowRegular: require("@/assets/fonts/Barlow-Regular.ttf"),
  });

  if (!loaded) return null;

  const handlePress = () => {
    if (osField && osValue !== undefined) {
      setOs({ [osField]: osValue });
    }
    router.push(route);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.container, { backgroundColor }]}
    >
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} resizeMode="contain" />
        {title && (
          <Text
            style={[
              styles.title,
              { color: titleColor, fontFamily: "BarlowRegular" },
            ]}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: 110,
    height: 110,
    marginTop: 10,
  },
  title: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -12 }],
    fontSize: 24,
    textAlign: "center",
  },
});
