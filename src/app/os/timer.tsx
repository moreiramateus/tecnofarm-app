import InfoCard from "@/components/timer";
import BottomButtons from "@/components/ui/ButtonBarBackground";
import BackHeader from "@/components/ui/HeaderBack";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function timer() {
  const router = useRouter();
  return (
    <View style={styles.safeArea}>
      <BackHeader />
      <View style={styles.extend}>
        <InfoCard />
      </View>
      <BottomButtons onNext={() => router.push("/os/cameraFinishOs")} />
    </View>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  extend: {
    flex: 1,
  },
});
