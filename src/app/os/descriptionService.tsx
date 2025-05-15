import BottomButtons from "@components/ui/ButtonBarBackground";
import BackHeader from "@components/ui/HeaderBack";
import InputTextList from "@components/ui/inputTextList";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

export default function TipoMaquina() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <BackHeader />
      <ScrollView>
        <View>
          <Text style={styles.title}>Descreva o serviço:</Text>
          <InputTextList placeholder="Observações sobre o serviço executado..." />
        </View>
        <View style={styles.input}></View>
      </ScrollView>
      <BottomButtons onNext={() => router.push("/os/resumeFinishOs")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  title: {
    fontSize: 30,
    marginBottom: 15,
    marginTop: 20,
    marginLeft: 25,
  },
  input: {
    marginBottom: 20,
  },
});
