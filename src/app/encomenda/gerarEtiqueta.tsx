import BackHeader from "@components/ui/HeaderBack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as Print from "expo-print";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ResumoEtiquetaScreen() {
  const [dados, setDados] = useState<any>(null);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = await AsyncStorage.getItem("usuarioSelecionado");
      const itens = await AsyncStorage.getItem("produtosSelecionados");
      const logoUri = await AsyncStorage.getItem("logoSelecionado");
      if (user) setDados(JSON.parse(user));
      if (itens) setProdutos(JSON.parse(itens));
      if (logoUri) setLogo(logoUri);
    };
    fetchData();
  }, []);

  const escolherLogo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = `data:image/png;base64,${result.assets[0].base64}`;
      setLogo(uri);
      await AsyncStorage.setItem("logoSelecionado", uri);
    }
  };

  const gerarEtiquetaHTML = () => {
    return `
      <html>
        <head><style>body { font-family: Arial; padding: 20px; }</style></head>
        <body>
          ${logo ? `<img src="${logo}" height="50" />` : ""}
          <h3>Etiqueta</h3>
          <p><strong>Destinatário:</strong><br />
          ${dados.nome}<br />
          ${dados.endereco}, ${dados.numero} - ${dados.bairro}<br />
          ${dados.cidade} - ${dados.uf} - ${dados.cep}</p>
        </body>
      </html>`;
  };

  const gerarDeclaracaoHTML = () => {
    return `
      <html>
        <head><style>body { font-family: Arial; padding: 20px; }</style></head>
        <body>
          <h3>Declaração de Conteúdo</h3>
          <p><strong>Destinatário:</strong> ${dados.nome}, ${dados.endereco}, ${
      dados.numero
    } - ${dados.bairro}, ${dados.cidade} - ${dados.uf}, CEP: ${dados.cep}</p>
          <h4>Produtos:</h4>
          <ul>
            ${produtos
              .map(
                (p) =>
                  `<li>${p.descricao} - Qtd: ${p.quantidade} - R$ ${p.valor}</li>`
              )
              .join("")}
          </ul>
        </body>
      </html>`;
  };

  const imprimirPDF = async (html: string) => {
    await Print.printAsync({ html });
  };

  if (!dados) return <Text style={{ padding: 20 }}>Carregando...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Resumo da Etiqueta</Text>

        {logo && (
          <Image
            source={{ uri: logo }}
            style={{
              height: 50,
              width: 100,
              resizeMode: "contain",
              marginBottom: 10,
            }}
          />
        )}

        <TouchableOpacity onPress={escolherLogo} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>
            {logo ? "Alterar Logo" : "Selecionar Logo"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Destinatário:</Text>
        <View style={styles.subtitle}>
          <Text>
            {dados.nome} - {dados.cidade}/{dados.uf}
          </Text>
          <Text>
            {dados.endereco}, {dados.numero} - {dados.bairro}
          </Text>
          <Text>CEP: {dados.cep}</Text>
          <Text>CPF/CNPJ: {dados.cpf}</Text>
        </View>

        <Text style={styles.label}>Produtos:</Text>
        <View style={styles.subtitle}>
          {produtos.length === 0 ? (
            <Text style={{ fontStyle: "italic" }}>Sem produtos</Text>
          ) : (
            produtos.map((p, i) => (
              <Text key={i}>
                • {p.descricao} - Qtd: {p.quantidade} - R$ {p.valor}
              </Text>
            ))
          )}
        </View>

        <TouchableOpacity
          onPress={() => imprimirPDF(gerarEtiquetaHTML())}
          style={styles.uploadButton}
        >
          <Text style={styles.uploadButtonText}>Imprimir Etiqueta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => imprimirPDF(gerarDeclaracaoHTML())}
          style={styles.uploadButton}
        >
          <Text style={styles.uploadButtonText}>Imprimir Declaração</Text>
        </TouchableOpacity>
      </ScrollView>
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    marginTop: 24,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: "bold",
  },
  uploadButton: {
    backgroundColor: "#1C974B",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  uploadButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
