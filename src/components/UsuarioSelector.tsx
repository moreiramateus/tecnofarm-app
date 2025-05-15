import { Ionicons } from "@expo/vector-icons";
import { useOs } from "@src/context/OsContext";
import { useUsuarios } from "@src/context/UsuariosContext";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type UsuarioSelectorProps = {
  tipo: "assistente" | "gerente";
};

export default function UsuarioSelector({ tipo }: UsuarioSelectorProps) {
  const [input, setInput] = useState("");

  const {
    assistentes,
    gerentes,
    adicionarAssistente,
    adicionarGerente,
    removerAssistente,
    removerGerente,
  } = useUsuarios();

  const { setOs } = useOs();

  const usuarios = tipo === "assistente" ? assistentes : gerentes;
  const adicionar =
    tipo === "assistente" ? adicionarAssistente : adicionarGerente;
  const remover = tipo === "assistente" ? removerAssistente : removerGerente;

  const titulo =
    tipo === "assistente" ? "Técnicos Auxiliares" : "Responsável Técnico";

  const handleAdicionar = () => {
    if (input.trim()) {
      adicionar(input.trim());
      setInput("");
    }
  };

  const handleRemover = (nome: string) => {
    remover(nome);
  };

  // Atualiza o contexto da OS com base nos dois grupos
  useEffect(() => {
    setOs({
      technicalAssistent: assistentes.join(", "),
      technicalManager: gerentes.join(", "),
    });
  }, [assistentes, gerentes]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar {titulo}</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={`Nome do ${
            tipo === "assistente" ? "técnico" : "responsável"
          }`}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdicionar}>
          <Ionicons name="add-circle" size={28} color="#1C974B" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userText}>{item}</Text>
            <TouchableOpacity onPress={() => handleRemover(item)}>
              <Ionicons name="trash" size={22} color="#D9534F" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum {tipo} adicionado.</Text>
        }
        contentContainerStyle={usuarios.length === 0 && styles.emptyContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    padding: 5,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  userText: {
    fontSize: 16,
  },
  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
