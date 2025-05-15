// ResumoGestaoOS.tsx
// Tela unificada: listar, buscar, editar e exportar OS

import BottomButtonBack from "@/components/ui/ButtonBarBackgroundBack";
import BackHeader from "@/components/ui/HeaderBack";
import { atualizarOS, listarOS } from "@/database/useOsDatabase";
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
    TouchableOpacity,
    View,
} from "react-native";

export default function ResumoGestaoOS() {
  const [lista, setLista] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [selecionada, setSelecionada] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editando, setEditando] = useState<any>({});

  const carregar = async () => {
    const dados = await listarOS();
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

  const abrirEdicao = (os: any) => {
    setEditando(os);
    setModalVisible(true);
  };

  const salvarEdicao = async () => {
    try {
      await atualizarOS(editando.id, editando);
      setModalVisible(false);
      carregar();
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar alterações.");
    }
  };

  const exportarPDF = async (os: any) => {
    const servicos =
      os.serviceExecute
        ?.map((s: any) => `• ${s.descricao} - ${s.categoria} (${s.dataHora})`)
        .join("<br>") || "Sem serviços executados.";

    const html = `
      <html>
        <body>
          <h1>Ordem de Serviço</h1>
          <p><strong>Cliente:</strong> ${os.client}</p>
          <p><strong>Marca:</strong> ${os.brand}</p>
          <p><strong>Tipo Máquina:</strong> ${os.typeMachine}</p>
          <p><strong>Modelo:</strong> ${os.modelMachine}</p>
          <p><strong>Número Frota / Serial:</strong> ${os.frotaNumber}</p>
          <p><strong>Tipo de Serviço:</strong> ${os.typeService}</p>
          <p><strong>Tipo de Manutenção:</strong> ${os.maintanceType}</p>
          <p><strong>Responsável Técnico:</strong> ${os.technicalManager}</p>
          <p><strong>Técnicos Auxiliares:</strong> ${os.technicalAssistent}</p>
          <p><strong>Localização:</strong> ${os.location}</p>
          <p><strong>Geolocalização:</strong> ${os.geolocalizacao}</p>
          <p><strong>Hora de Início:</strong> ${os.horaInicio}</p>
          <p><strong>Hora de Fim:</strong> ${os.horaFim}</p>
          <p><strong>Observações:</strong> ${os.observationOs}</p>
          <p><strong>Serviços Executados:</strong><br>${servicos}</p>
          <p><strong>Data de Criação:</strong> ${new Date(
            os.createdAt
          ).toLocaleString()}</p>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackHeader />
      <View style={styles.container}>
        <Text style={styles.title}>Gerenciar Ordens de Serviço</Text>

        <TextInput
          placeholder="Buscar por cliente ou data"
          style={styles.input}
          value={busca}
          onChangeText={setBusca}
        />

        <FlatList
          data={aplicarFiltro()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cliente}>{item.client}</Text>
                <Text style={styles.data}>
                  {new Date(item.createdAt).toLocaleString()}
                </Text>
              </View>
              <TouchableOpacity onPress={() => abrirEdicao(item)}>
                <Ionicons name="create" size={24} color="#1C974B" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => exportarPDF(item)}>
                <Ionicons name="document" size={24} color="#007aff" />
              </TouchableOpacity>
            </View>
          )}
        />

        <Modal visible={modalVisible} animationType="slide">
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar OS</Text>

            <TextInput
              style={styles.input}
              placeholder="Cliente"
              value={editando.client}
              onChangeText={(t) => setEditando({ ...editando, client: t })}
            />

            <TextInput
              style={styles.input}
              placeholder="Marca"
              value={editando.brand}
              onChangeText={(t) => setEditando({ ...editando, brand: t })}
            />

            <TextInput
              style={styles.input}
              placeholder="Modelo"
              value={editando.modelMachine}
              onChangeText={(t) =>
                setEditando({ ...editando, modelMachine: t })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Tipo Máquina"
              value={editando.typeMachine}
              onChangeText={(t) => setEditando({ ...editando, typeMachine: t })}
            />

            <TextInput
              style={styles.input}
              placeholder="Número Frota / Serial"
              value={editando.frotaNumber}
              onChangeText={(t) => setEditando({ ...editando, frotaNumber: t })}
            />

            <TextInput
              style={styles.input}
              placeholder="Tipo de Serviço"
              value={editando.typeService}
              onChangeText={(t) => setEditando({ ...editando, typeService: t })}
            />

            <TextInput
              style={styles.input}
              placeholder="Tipo de Manutenção"
              value={editando.maintanceType}
              onChangeText={(t) =>
                setEditando({ ...editando, maintanceType: t })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Responsável Técnico"
              value={editando.technicalManager}
              onChangeText={(t) =>
                setEditando({ ...editando, technicalManager: t })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Técnicos Auxiliares"
              value={editando.technicalAssistent}
              onChangeText={(t) =>
                setEditando({ ...editando, technicalAssistent: t })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Localização"
              value={editando.location}
              onChangeText={(t) => setEditando({ ...editando, location: t })}
            />

            <TextInput
              style={styles.input}
              placeholder="Geolocalização"
              value={editando.geolocalizacao}
              onChangeText={(t) =>
                setEditando({ ...editando, geolocalizacao: t })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Hora de Início"
              value={editando.horaInicio}
              onChangeText={(t) => setEditando({ ...editando, horaInicio: t })}
            />

            <TextInput
              style={styles.input}
              placeholder="Hora de Fim"
              value={editando.horaFim}
              onChangeText={(t) => setEditando({ ...editando, horaFim: t })}
            />

            <TextInput
              style={styles.input}
              placeholder="Observações"
              value={editando.observationOs}
              onChangeText={(t) =>
                setEditando({ ...editando, observationOs: t })
              }
            />

            <TouchableOpacity style={styles.botaoSalvar} onPress={salvarEdicao}>
              <Text style={styles.botaoSalvarTexto}>Salvar Alterações</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: 20, alignSelf: "center" }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "#007aff" }}>Cancelar</Text>
            </TouchableOpacity>
          </ScrollView>
        </Modal>
      </View>
      <BottomButtonBack />
    </SafeAreaView>
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
    gap: 12,
  },
  cliente: { fontWeight: "600", fontSize: 16 },
  data: { fontSize: 12, color: "#666" },
  modalContent: { padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  botaoSalvar: {
    backgroundColor: "#1C974B",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  botaoSalvarTexto: { color: "white", fontWeight: "bold" },
});
