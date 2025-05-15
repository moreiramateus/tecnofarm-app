import BottomButtons from "@/components/ui/ButtonBarBackground";
import BackHeader from "@/components/ui/HeaderBack";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
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
  const [dados, setDados] = useState<any | null>(null);
  const [remetente] = useState({
    cep: "38613038",
    nome: "Tecnofarm",
    endereco: "Rua dos Lirios",
    numero: "501",
    complemento: "A",
    bairro: "Jardim",
    cidade: "Unaí",
    cnpj: "37041108000132",
    uf: "MG",
  });

  const [produtos, setProdutos] = useState<any[]>([]);
  const [produtoTemp, setProdutoTemp] = useState({
    descricao: "",
    quantidade: "",
    valor: "",
  });

  useEffect(() => {
    const carregarDestinatario = async () => {
      const data = await AsyncStorage.getItem("usuarioSelecionado");
      if (data) {
        setDados(JSON.parse(data));
      }

      const produtosSalvos = await AsyncStorage.getItem("produtosSelecionados");
      if (produtosSalvos) {
        setProdutos(JSON.parse(produtosSalvos));
      }
    };
    carregarDestinatario();
  }, []);

  const adicionarProduto = async () => {
    if (!produtoTemp.descricao || !produtoTemp.quantidade || !produtoTemp.valor)
      return;
    const novosProdutos = [...produtos, produtoTemp];
    setProdutos(novosProdutos);
    await AsyncStorage.setItem(
      "produtosSelecionados",
      JSON.stringify(novosProdutos)
    );
    setProdutoTemp({ descricao: "", quantidade: "", valor: "" });
  };

  const removerProduto = async (index: number) => {
    const updated = produtos.filter((_, i) => i !== index);
    setProdutos(updated);
    await AsyncStorage.setItem("produtosSelecionados", JSON.stringify(updated));
  };

  const limparProdutos = async () => {
    await AsyncStorage.removeItem("produtosSelecionados");
    router.back();
  };

  if (!dados) return <Text style={{ padding: 20 }}>Carregando...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader onPress={limparProdutos} />
      <Text style={styles.title}>Etiqueta</Text>
      <View style={styles.subtitle}>
        <Text>Nome: {dados.nome}</Text>
        <Text>
          Endereço: {dados.endereco}, {dados.numero} - {dados.bairro}
        </Text>
        <Text>
          Cidade: {dados.cidade} - {dados.uf}
        </Text>
        <Text>CEP: {dados.cep}</Text>
        <Text>CPF/CNPJ: {dados.cpf}</Text>
      </View>
      <Text style={styles.title}>Produtos Adicionados</Text>
      <ScrollView>
        {produtos.length === 0 ? (
          <Text style={{ paddingLeft: 20, fontStyle: "italic", color: "#555" }}>
            Sem produtos cadastrados.
          </Text>
        ) : (
          produtos.map((p, i) => (
            <View key={i} style={styles.produtoItem}>
              <Text style={styles.produtoTexto}>
                • {p.descricao} - Qtd: {p.quantidade} - R$ {p.valor}
              </Text>
              <TouchableOpacity onPress={() => removerProduto(i)}>
                <Ionicons name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <Text style={styles.title}>Adicionar Produto</Text>
      <View style={{ marginBottom: 10, padding: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={produtoTemp.descricao}
          onChangeText={(text) =>
            setProdutoTemp({ ...produtoTemp, descricao: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          keyboardType="numeric"
          value={produtoTemp.quantidade.toString()}
          onChangeText={(text) =>
            setProdutoTemp({ ...produtoTemp, quantidade: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Valor (R$)"
          keyboardType="decimal-pad"
          value={produtoTemp.valor.toString()}
          onChangeText={(text) =>
            setProdutoTemp({ ...produtoTemp, valor: text })
          }
        />
        <TouchableOpacity onPress={adicionarProduto} style={styles.addButton}>
          <Text style={styles.addButtonText}>Adicionar Produto</Text>
        </TouchableOpacity>
      </View>

      <BottomButtons
        onNext={() => router.push("/encomenda/gerarEtiqueta")}
        nextLabel="Avançar"
        onBack={() => {
          limparProdutos();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    paddingLeft: 20,
    marginBottom: 10,
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#1C974B",
    padding: 15,
    marginTop: 10,
    borderRadius: 30,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  produtoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  produtoTexto: {
    flex: 1,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
});
