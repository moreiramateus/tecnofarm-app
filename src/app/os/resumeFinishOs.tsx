import { initializeDatabase } from "@/database/initializeDatabase";
import { salvarOS } from "@/database/useOsDatabase";
import BottomButtonFinish from "@components/buttonFinishOs";
import BackHeader from "@components/ui/HeaderBack";
import { Ionicons } from "@expo/vector-icons";
import { useOs } from "@src/context/OsContext";
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

export default function ResumoOS() {
  const { os, resetOs } = useOs();
  const router = useRouter();
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);

  useEffect(() => {
    initializeDatabase();
  }, []);

  const handleFinalizar = async () => {
    try {
      const dadosComData = {
        ...os,
        createdAt: new Date().toISOString(),
      };

      await salvarOS(dadosComData);
      resetOs();
      Alert.alert("Sucesso", "Ordem de Serviço salva com sucesso!");
      router.replace("/");
    } catch (error) {
      console.error("Erro ao salvar OS:", error);
      Alert.alert("Erro", "Não foi possível salvar a Ordem de Serviço.");
    }
  };

  const renderItem = (label: string, value?: string) => (
    <View style={styles.item}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value || "—"}</Text>
    </View>
  );

  const renderServicosExecutados = () => {
    if (!os.serviceExecute || os.serviceExecute.length === 0) {
      return renderItem("Serviços Executados", "Nenhum serviço registrado.");
    }

    return (
      <View style={styles.item}>
        <Text style={styles.label}>Serviços Executados:</Text>
        {os.serviceExecute.map((servico, index) => (
          <View key={index} style={styles.servicoItem}>
            <Text style={styles.servicoTitulo}>• {servico.descricao}</Text>
            <Text style={styles.servicoDetalhe}>
              {servico.categoria} | {servico.dataHora}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderFotos = (fotos: string | string[] | undefined) => {
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

        {renderItem("Cliente/Responsável", os.client)}
        {renderItem("Marca", os.brand)}
        {renderItem("Tipo de Máquina/Equipamento", os.typeMachine)}
        {renderItem("Modelo da Máquina/Modelo do Equipamento", os.modelMachine)}
        {renderItem("Número da Frota / Serial", os.frotaNumber)}
        {renderItem("Tipo de Serviço", os.typeService)}
        {renderItem("Tipo de Manutenção", os.maintanceType)}
        {renderItem("Responsável Técnico", os.technicalManager)}
        {renderItem("Técnicos Auxiliares", os.technicalAssistent)}
        {renderItem("Localização", os.location)}
        {renderItem("Localização Abertura O.S", os.geolocalizacao)}
        {renderItem("Hora de Início", os.horaInicio)}
        {renderItem("Hora de Fim", os.horaFim)}
        {renderItem("Observação", os.observationOs)}
        {renderServicosExecutados()}

        <View style={styles.item}>
          <Text style={styles.label}>Fotos do Início:</Text>
          {renderFotos(os.fotoOS)}
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Fotos da Finalização:</Text>
          {renderFotos(os.fotoOSFinish)}
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
  servicoItem: {
    marginBottom: 10,
    paddingLeft: 10,
  },
  servicoTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  servicoDetalhe: {
    fontSize: 14,
    color: "#666",
  },
});
