import MultiCameraInputGlobal from "@/components/cameraGlobalInput";
import BottomButtons from "@/components/ui/ButtonBarBackground";
import BackHeader from "@/components/ui/HeaderBack";
import { useReceipt } from "@/context/ReceiptContext";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function CameraPage() {
  const { receipt, setReceipt } = useReceipt();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader />
      <ScrollView contentContainerStyle={styles.scroll}>
        <MultiCameraInputGlobal
          useContextHook={() => ({
            fotosRecibo: receipt?.fotoReceipt || [],
            set: (data) => setReceipt({ ...receipt, ...data }),
          })}
          field="fotoReceipt"
          title="Fotos do Recibo"
          description="Tire fotos da máquina, local ou comprovantes"
        />
      </ScrollView>
      <BottomButtons onNext={() => router.push("/comprovante/resumeReceipt")} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scroll: {
    padding: 20,
    gap: 20,
  },
});
