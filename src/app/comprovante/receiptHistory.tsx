import BottomButtonBack from "@/components/ui/ButtonBarBackgroundBack";
import BackHeader from "@/components/ui/HeaderBack";
import { listReceipt, updateReceipt } from "@/database/useReceiptDatabase";
import { Ionicons } from "@expo/vector-icons";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  RectButton,
  Swipeable,
} from "react-native-gesture-handler";

export default function ResumoGestaoComprovantes() {
  const [lista, setLista] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editando, setEditando] = useState<any>({});

  const carregar = async () => {
    const dados = await listReceipt();
    setLista(dados);
  };

  useEffect(() => {
    carregar();
  }, []);

  const aplicarFiltro = () => {
    return lista.filter(
      (item) =>
        item.client?.toLowerCase().includes(busca.toLowerCase()) ||
        item.createdAt?.includes(busca)
    );
  };

  const abrirEdicao = (item: any) => {
    setEditando(item);
    setModalVisible(true);
  };

  const salvarEdicao = async () => {
    try {
      await updateReceipt(editando.id, editando);
      setModalVisible(false);
      carregar();
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar alterações.");
    }
  };

  const exportarPDF = async (receipt: any) => {
    const html = `
      <html>
        <body>
          <h1>Comprovante</h1>
          <p><strong>Cliente:</strong> ${receipt.client}</p>
          <p><strong>Data:</strong> ${new Date(receipt.createdAt).toLocaleString()}</p>
          <p><strong>Título:</strong> ${receipt.titulo || "Sem título"}</p>
          <p><strong>Valor:</strong> ${receipt.valor || "Não informado"}</p>
          <p><strong>Descrição:</strong> ${receipt.descricao || "Sem descrição"}</p>
        </body>
      </html>
    `;
    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <BackHeader />
        <View style={styles.container}>
          <Text style={styles.title}>Gerenciar Comprovantes</Text>

          <TextInput
            placeholder="Buscar por cliente ou data"
            style={styles.input}
            value={busca}
            onChangeText={setBusca}
          />

          <FlatList
            data={aplicarFiltro()}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const renderRightActions = () => (
                <View style={styles.swipeActions}>
                  <RectButton
                    style={[styles.actionButton, { backgroundColor: "#1C974B" }]}
                    onPress={() => abrirEdicao(item)}
                  >
                    <Ionicons name="create" size={24} color="#fff" />
                    <Text style={styles.actionText}>Editar</Text>
                  </RectButton>
                  <RectButton
                    style={[styles.actionButton, { backgroundColor: "#007aff" }]}
                    onPress={() => exportarPDF(item)}
                  >
                    <Ionicons name="document" size={24} color="#fff" />
                    <Text style={styles.actionText}>Exportar</Text>
                  </RectButton>
                </View>
              );

              return (
                <Swipeable renderRightActions={renderRightActions}>
                  <View style={styles.card}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cliente}>{item.client}</Text>
                      <Text style={styles.titulo}>{item.titulo || "Sem título"}</Text>
                      <Text style={styles.data}>
                        {new Date(item.createdAt).toLocaleString()}
                      </Text>
                    </View>
                  </View>
                </Swipeable>
              );
            }}
          />

          <Modal visible={modalVisible} animationType="slide">
            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Comprovante</Text>

              <TextInput
                style={styles.input}
                placeholder="Cliente"
                value={editando.client}
                onChangeText={(t) => setEditando({ ...editando, client: t })}
              />
              <TextInput
                style={styles.input}
                placeholder="Título"
                value={editando.titulo}
                onChangeText={(t) => setEditando({ ...editando, titulo: t })}
              />
              <TextInput
                style={styles.input}
                placeholder="Valor"
                value={editando.valor}
                onChangeText={(t) => setEditando({ ...editando, valor: t })}
              />
              <TextInput
                style={styles.input}
                placeholder="Descrição"
                value={editando.descricao}
                onChangeText={(t) => setEditando({ ...editando, descricao: t })}
              />

              <RectButton style={styles.botaoSalvar} onPress={salvarEdicao}>
                <Text style={styles.botaoSalvarTexto}>Salvar Alterações</Text>
              </RectButton>

              <RectButton
                style={{ marginTop: 20, alignSelf: "center" }}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "#007aff" }}>Cancelar</Text>
              </RectButton>
            </ScrollView>
          </Modal>
        </View>
        <BottomButtonBack />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f3f3f3",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  cliente: { fontWeight: "600", fontSize: 16 },
  titulo: { fontSize: 14, fontStyle: "italic", color: "#444" },
  data: { fontSize: 12, color: "#666" },
  modalContent: { padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  botaoSalvar: {
    backgroundColor: "#1C974B",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  botaoSalvarTexto: { color: "white", fontWeight: "bold" },
  swipeActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  actionText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
});
