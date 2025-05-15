import BottomButtons from "@/components/ui/ButtonBarBackground";
import BackHeader from "@/components/ui/HeaderBack";
import { buscarEnderecoPorCep } from "@/services/cepService";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function EtiquetaScreen() {
  const router = useRouter();
  const [modoNovo, setModoNovo] = useState(true);
  const [usuariosSalvos, setUsuariosSalvos] = useState<any[]>([]);
  const [destinatario, setDestinatario] = useState({
    cep: "",
    nome: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    cpf: "",
    uf: "",
  });

  useEffect(() => {
    carregarUsuariosSalvos();
  }, []);

  const carregarUsuariosSalvos = async () => {
    const data = await AsyncStorage.getItem("usuariosSalvos");
    if (data) {
      setUsuariosSalvos(JSON.parse(data));
    }
  };

  const salvarUsuario = async () => {
    const novosUsuarios = [...usuariosSalvos, destinatario];
    await AsyncStorage.setItem("usuariosSalvos", JSON.stringify(novosUsuarios));
    setUsuariosSalvos(novosUsuarios);
    await AsyncStorage.setItem(
      "usuarioSelecionado",
      JSON.stringify(destinatario)
    );
    router.push("/encomenda/resumo");
  };

  const selecionarUsuarioSalvo = async (index: number) => {
    const usuario = usuariosSalvos[index];
    await AsyncStorage.setItem("usuarioSelecionado", JSON.stringify(usuario));
    router.push("/encomenda/resumo");
  };

  const deletarUsuarioSalvo = (index: number) => {
    Alert.alert(
      "Excluir Usuário",
      "Tem certeza que deseja remover este usuário?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            const atualizados = usuariosSalvos.filter((_, i) => i !== index);
            await AsyncStorage.setItem(
              "usuariosSalvos",
              JSON.stringify(atualizados)
            );
            setUsuariosSalvos(atualizados);
          },
        },
      ]
    );
  };

  const handleChange = async (field: string, value: string) => {
    setDestinatario((prev) => ({ ...prev, [field]: value }));

    if (field === "cep" && value.length === 8) {
      const data = await buscarEnderecoPorCep(value);
      if (data) {
        setDestinatario((prev) => ({
          ...prev,
          endereco: data.logradouro || "",
          bairro: data.bairro || "",
          cidade: data.localidade || "",
          uf: data.uf || "",
          cep: value,
        }));
      } else {
        alert("CEP inválido ou não encontrado.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader onPress={() => router.push("/")} />
      <Text style={styles.title}>Dados do Destinatário</Text>

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, modoNovo && styles.activeToggle]}
          onPress={() => setModoNovo(true)}
        >
          <Text style={modoNovo ? styles.activeText : styles.inactiveText}>
            Novo Usuário
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !modoNovo && styles.activeToggle]}
          onPress={() => setModoNovo(false)}
        >
          <Text style={!modoNovo ? styles.activeText : styles.inactiveText}>
            Usuário Salvo
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          {modoNovo ? (
            <>
              {[
                "cep",
                "nome",
                "endereco",
                "numero",
                "complemento",
                "bairro",
                "cidade",
                "cpf",
                "uf",
              ].map((field, i) => (
                <TextInput
                  key={i}
                  style={styles.input}
                  placeholder={field.toUpperCase()}
                  keyboardType={
                    field === "cep" || field === "numero" || field === "cpf"
                      ? "numeric"
                      : "default"
                  }
                  maxLength={field === "cep" ? 8 : undefined}
                  value={destinatario[field]}
                  onChangeText={(text) => handleChange(field, text)}
                />
              ))}
            </>
          ) : (
            usuariosSalvos.map((user, i) => (
              <View key={i} style={styles.userCardRow}>
                <TouchableOpacity
                  style={styles.userCard}
                  onPress={() => selecionarUsuarioSalvo(i)}
                >
                  <Text style={styles.userCardText}>
                    {user.nome} - {user.cidade}/{user.uf}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteIcon}
                  onPress={() => deletarUsuarioSalvo(i)}
                >
                  <Ionicons name="trash" size={20} color="red" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {modoNovo && (
        <BottomButtons
          onNext={salvarUsuario}
          onBack={() => router.push("/")}
          nextLabel="Salvar"
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  formGroup: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    paddingLeft: 20,
    marginBottom: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 10,
    width: 150,
    height: 40,
  },
  activeToggle: {
    backgroundColor: "#1C974B",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
    justifyContent: "center",
    alignContent: "center",
  },
  inactiveText: {
    color: "#1C974B",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#1C974B",
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  userCard: {
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 50,
    flex: 1,
  },
  userCardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  userCardText: {
    fontSize: 16,
  },
  deleteIcon: {
    paddingHorizontal: 10,
  },
});
