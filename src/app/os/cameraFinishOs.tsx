import MultiCameraInput from "@components/cameraInput";
import BottomButtons from "@components/ui/ButtonBarBackground";
import BackHeader from "@components/ui/HeaderBack";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function CameraType() {
  const router = useRouter();
  return (
    <View style={styles.safeArea}>
      <BackHeader />
      <View style={styles.extend}>
        <MultiCameraInput
          osField="fotoOSFinish"
          title="Fotos da O.S "
          description="Tire uma ou mais fotos do serviço final realizado"
        />
      </View>
      <BottomButtons onNext={() => router.push("/os/addServiceList")} />
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
