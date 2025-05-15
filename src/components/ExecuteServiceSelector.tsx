import { Ionicons } from "@expo/vector-icons";
import { useOs } from "@src/context/OsContext";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const categoriasDisponiveis = [
  "Elétrica",
  "Hidráulica",
  "Mecânica",
  "Configuração",
  "Instalação",
];

export default function ServicoExecutadoSelector() {
  const { os, setOs } = useOs();
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [servicos, setServicos] = useState(os.serviceExecute|| []);

  const adicionarServico = () => {
    if (!descricao.trim() || !categoria.trim()) return;

    const novoServico = {
      descricao: descricao.trim(),
      categoria: categoria.trim(),
      dataHora: new Date().toLocaleString("pt-BR"),
    };

    setServicos((prev) => [...prev, novoServico]);
    setDescricao("");
    setCategoria("");
  };

  const removerServico = (index: number) => {
    const atualizado = [...servicos];
    atualizado.splice(index, 1);
    setServicos(atualizado);
  };

  useEffect(() => {
    setOs({ serviceExecute: servicos });
  }, [servicos]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Serviços Executados</Text>

      <TextInput
        style={styles.input}
        placeholder="Descrição do serviço"
        value={descricao}
        onChangeText={setDescricao}
      />

      <TextInput
        style={styles.input}
        placeholder="Categoria (ex: Elétrica)"
        value={categoria}
        onChangeText={setCategoria}
      />

      {/* Sugestões rápidas */}
      <View style={styles.tags}>
        {categoriasDisponiveis.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.tag, cat === categoria && styles.tagSelected]}
            onPress={() => setCategoria(cat)}
          >
            <Text
              style={[
                styles.tagText,
                cat === categoria && styles.tagTextSelected,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={adicionarServico}>
        <Ionicons name="add-circle" size={28} color="#1C974B" />
        <Text style={styles.addText}>Adicionar Serviço</Text>
      </TouchableOpacity>

      <FlatList
        data={servicos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.servicoItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.servicoDesc}>{item.descricao}</Text>
              <Text style={styles.servicoInfo}>
                {item.categoria} - {item.dataHora}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removerServico(index)}>
              <Ionicons name="trash" size={22} color="#D9534F" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum serviço adicionado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: "#eee",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  tagSelected: {
    backgroundColor: "#1C974B",
  },
  tagText: {
    color: "#333",
  },
  tagTextSelected: {
    color: "#fff",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 20,
  },
  addText: {
    fontSize: 16,
    color: "#1C974B",
    fontWeight: "bold",
  },
  servicoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  servicoDesc: {
    fontSize: 16,
    fontWeight: "bold",
  },
  servicoInfo: {
    fontSize: 14,
    color: "#666",
  },
  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
});
