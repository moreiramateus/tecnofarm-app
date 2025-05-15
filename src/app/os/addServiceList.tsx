import ServiceExecuteSelector from "@components/ExecuteServiceSelector";
import BottomButtons from "@components/ui/ButtonBarBackground";
import BackHeader from "@components/ui/HeaderBack";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  View
} from "react-native";

export default function ListService() {
  const router = useRouter();
  return (
    <View style={styles.safeArea}>
      <BackHeader />
      <View style={styles.container}>
        <ServiceExecuteSelector />
      </View>
      <BottomButtons onNext={() => router.push("/os/descriptionService")} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
