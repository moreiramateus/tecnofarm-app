import { useOs } from "@context/OsContext";
import * as Location from "expo-location";
import { useState } from "react";
import { Alert } from "react-native";

export function useLocationCapture() {
  const { setOs } = useOs();
  const [coords, setCoords] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const capturarLocalizacao = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Não foi possível acessar a localização."
        );
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const coordText = `${location.coords.latitude.toFixed(
        6
      )}, ${location.coords.longitude.toFixed(6)}`;
      setCoords(coordText);
      setOs({ geolocalizacao: coordText });
    } catch (error) {
      Alert.alert("Erro", "Erro ao obter localização.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    coords,
    loading,
    capturarLocalizacao,
  };
}
