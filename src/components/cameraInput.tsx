import { Ionicons } from "@expo/vector-icons";
import { useOs } from "@src/context/OsContext";
import { Camera, CameraView } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  title?: string;
  description?: string;
  osField: string; // campo no contexto Os para armazenar as fotos
};

export default function MultiCameraInput({
  title = "Fotos da Ordem de Serviço",
  description = "Tire uma ou mais fotos da máquina ou local",
  osField,
}: Props) {
  const { setOs } = useOs();
  const cameraRef = useRef<CameraView>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    setOs({ [osField]: photos });
  }, [photos]);

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        skipProcessing: true,
      });

      const manipResult = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );

      setPhotos((prev) => [...prev, manipResult.uri]);
    }
  };

  const handleRemovePhoto = (uri: string) => {
    setPhotos((prev) => prev.filter((item) => item !== uri));
  };

  if (hasPermission === null) return <Text>Solicitando permissão...</Text>;
  if (hasPermission === false) return <Text>Permissão da câmera negada.</Text>;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing="back" ref={cameraRef} />
        <TouchableOpacity
          style={styles.captureButton}
          onPress={handleTakePicture}
        >
          <Ionicons name="camera-outline" size={24} color="#fff" />
          <Text style={styles.captureText}>Tirar foto</Text>
        </TouchableOpacity>
      </View>

      {photos.length > 0 && (
        <View style={styles.galleryContainer}>
          <Text style={styles.galleryTitle}>Fotos tiradas:</Text>
          <FlatList
            horizontal
            data={photos}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View style={styles.thumbnailWrapper}>
                <Image source={{ uri: item }} style={styles.thumbnail} />
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleRemovePhoto(item)}
                >
                  <Ionicons name="close-circle" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  cameraContainer: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },
  camera: {
    width: "100%",
    height: 350,
  },
  captureButton: {
    position: "absolute",
    bottom: 12,
    alignSelf: "center",
    backgroundColor: "#1976D2",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  captureText: {
    color: "#fff",
    fontWeight: "bold",
  },
  galleryContainer: {
    marginTop: 10,
  },
  galleryTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  thumbnailWrapper: {
    position: "relative",
    marginRight: 12,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  deleteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#D32F2F",
    borderRadius: 10,
    padding: 2,
  },
});
