import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MenuButton() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState("Home");

  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.icon}>
        <Ionicons name="reorder-three" size={32} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        <View style={styles.fullScreen}>
          <View style={styles.topContainer}>
            <ImageBackground
              source={require("@assets/images/menuBackground.png")}
              style={styles.header}
              resizeMode="cover"
            >
              <View style={styles.overlay}>
                <Image
                  source={require("@assets/images/avatar.png")}
                  style={styles.avatar}
                />
                <Text style={styles.name}>Admin</Text>
                <Text style={styles.email}>admin@admin</Text>
              </View>
            </ImageBackground>
          </View>

          <ScrollView style={styles.menu}>
            <TouchableOpacity
              onPress={() => {
                setSelected("Home");
                setVisible(false);
                router.push("/" as any);
              }}
            >
              <View
                style={[
                  styles.menuItem,
                  selected === "Home" && styles.menuItemActive,
                ]}
              >
                <Ionicons
                  name="home-outline"
                  size={24}
                  color="#333"
                  style={styles.iconLeft}
                />
                <Text style={styles.item}>Home</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelected("Tarefas");
                setVisible(false);
                router.push("/configuracoes" as any);
              }}
            >
              <View
                style={[
                  styles.menuItem,
                  selected === "Tarefas" && styles.menuItemActive,
                ]}
              >
                <Ionicons
                  name="time-outline"
                  size={24}
                  color="#333"
                  style={styles.iconLeft}
                />
                <Text style={styles.item}>Tarefas</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelected("Ferramentas");
                setVisible(false);
                router.push("/ferramentas" as any);
              }}
            >
              <View
                style={[
                  styles.menuItem,
                  selected === "Ferramentas" && styles.menuItemActive,
                ]}
              >
                <Ionicons
                  name="hammer-outline"
                  size={24}
                  color="#333"
                  style={styles.iconLeft}
                />
                <Text style={styles.item}>Ferramentas</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelected("Encomendas");
                setVisible(false);
                router.push("./encomenda" as any);
              }}
            >
              <View
                style={[
                  styles.menuItem,
                  selected === "Encomendas" && styles.menuItemActive,
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={24}
                  color="#333"
                  style={styles.iconLeft}
                />
                <Text style={styles.item}>Encomendas</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelected("Estoque");
                setVisible(false);
                router.push("/estoque" as any);
              }}
            >
              <View
                style={[
                  styles.menuItem,
                  selected === "Estoque" && styles.menuItemActive,
                ]}
              >
                <Ionicons
                  name="cube-outline"
                  size={24}
                  color="#333"
                  style={styles.iconLeft}
                />
                <Text style={styles.item}>Estoque</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelected("Compras");
                setVisible(false);
                router.push("/notificacoes" as any);
              }}
            >
              <View
                style={[
                  styles.menuItem,
                  selected === "Compras" && styles.menuItemActive,
                ]}
              >
                <Ionicons
                  name="cart-outline"
                  size={24}
                  color="#333"
                  style={styles.iconLeft}
                />
                <Text style={styles.item}>Solicitação de compras</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelected("Configurações");
                setVisible(false);
                router.push("/configuracoes" as any);
              }}
            >
              <View
                style={[
                  styles.menuItem,
                  selected === "Configurações" && styles.menuItemActive,
                ]}
              >
                <Ionicons
                  name="settings-outline"
                  size={24}
                  color="#333"
                  style={styles.iconLeft}
                />
                <Text style={styles.item}>Configurações</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginTop: 25,
    marginBottom: 25,
    marginRight: 25,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topContainer: {
    height: 310,
    overflow: "hidden",
  },
  header: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 40 : 40,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 100,
    width: "100%",
  },
  overlay: {
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 540,
    marginBottom: 10,
    borderColor: "#fff",
    borderWidth: 2,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  email: {
    color: "#ddd",
    fontSize: 18,
  },
  menu: {
    flex: 1,
    backgroundColor: "#fff",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuItemActive: {
    backgroundColor: "#f2f2f2",
  },
  iconLeft: {
    marginRight: 16,
  },
  item: {
    fontSize: 18,
    color: "#333",
  },
});
