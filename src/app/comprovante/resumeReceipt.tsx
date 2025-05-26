import { initializeDatabaseReceits } from "@/database/initializeDatabase";
import { saveReceipt } from "@/database/useReceiptDatabase";
import BottomButtonFinish from "@components/buttonFinishOs";
import BackHeader from "@components/ui/HeaderBack";
import { Ionicons } from "@expo/vector-icons";
import { useReceipt } from "@src/context/ReceiptContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ResumoReceipt() {
  const { receipt, resetReceipt } = useReceipt();
  const router = useRouter();
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(
    null
  );

  useEffect(() => {
    initializeDatabaseReceits();
  }, []);

  const handleFinalizar = async () => {
    try {
      const dadosComData = {
        ...receipt,
        createdAt: new Date().toISOString(),
      };

      await saveReceipt(dadosComData);
      resetReceipt();
      Alert.alert("Sucesso", "Comprovante Salvo com Sucesso");
      router.replace("/comprovante/homeReceipt");
    } catch (error) {
      console.error("Erro ao salvar o comprovante:", error);
      Alert.alert("Erro", "Não foi possível salvar o Comprovante.");
    }
  };

  const renderItem = (label: string, value?: string) => (
    <View style={styles.item}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value || "—"}</Text>
    </View>
  );

  const renderFotos = (fotos?: string | string[]) => {
    if (!fotos || (Array.isArray(fotos) && fotos.length === 0)) {
      return <Text style={styles.fotoEmpty}>Sem fotos</Text>;
    }

    const lista = Array.isArray(fotos) ? fotos : [fotos];

    return (
      <FlatList
        data={lista}
        keyExtractor={(item, index) => `${item}-${index}`}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setImagemSelecionada(item)}>
            <Image source={{ uri: item }} style={styles.fotoThumb} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.fotoScrollContainer}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={styles.safeArea}>
      <BackHeader />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Resumo da Ordem de Serviço</Text>

        {renderItem("Categoria da Despesa", receipt.category)}
        {renderItem("Valor Pago", receipt.paidValue)}
        {renderItem("Forma de Pagamento", receipt.paymentMethod)}
        {renderItem("Descrição", receipt.description)}
        {renderItem("Usuário Responsável", receipt.userResponsible)}

        <View style={styles.item}>
          <Text style={styles.label}>Fotos do Comprovante:</Text>
          {renderFotos(receipt.fotoReceipt)}
        </View>
      </ScrollView>

      <Modal visible={!!imagemSelecionada} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setImagemSelecionada(null)}
          >
            <Ionicons name="close-circle" size={36} color="#fff" />
          </TouchableOpacity>

          {imagemSelecionada && (
            <Image
              source={{ uri: imagemSelecionada }}
              style={styles.fullscreenImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>

      <BottomButtonFinish onFinish={handleFinalizar} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
    gap: 15,
    flexGrow: 1,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
  },
  item: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#555",
  },
  fotoThumb: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  fotoScrollContainer: {
    gap: 12,
  },
  fotoEmpty: {
    fontSize: 14,
    color: "#888",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: {
    width: "90%",
    height: "80%",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 2,
  },
});
