import BottomButton from "@components/ui/ButtonBarBackground";
import BackHeader from "@components/ui/HeaderBack";
import UsuarioSelector from "@components/UsuarioSelector";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function AddTechnicalScreen() {
  const router = useRouter();

  return (
    <View style={styles.safeArea}>
      <BackHeader />

      <FlatList
        data={[]}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={
          <View style={styles.container}>
            <UsuarioSelector tipo="gerente" />
            <UsuarioSelector tipo="assistente" />
          </View>
        }
        ListFooterComponent={<View style={{ height: 120 }} />}
        contentContainerStyle={styles.listContainer}
      />

      <BottomButton onNext={() => router.push("/os/resumeInitialOs")} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 32,
  },
});
