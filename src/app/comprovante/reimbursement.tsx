import BottomButtonBack from "@components/ui/ButtonBarBackgroundBack";
import BackHeader from "@components/ui/HeaderBack";
import { StyleSheet, Text, View } from "react-native";

export default function ReceiptHistory() {
  return (
    <View style={styles.container}>
      <BackHeader />
      <View style = {styles.container}>
        <Text>Recibo em aberto</Text>
      </View>
      <BottomButtonBack />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },

});
