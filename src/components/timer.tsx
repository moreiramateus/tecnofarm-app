import { useOs } from "@src/context/OsContext";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function InfoCard() {
  const { setOs, os } = useOs();
  const [iniciado, setIniciado] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [mostrarInputs, setMostrarInputs] = useState(false);
  const [horaInicioManual, setHoraInicioManual] = useState("");
  const [horaFimManual, setHoraFimManual] = useState("");

  const formatHora = (data: Date) =>
    data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const handleIniciar = () => {
    const now = new Date();
    setStartTime(now);
    setElapsed(0);
    setOs({ horaInicio: formatHora(now) });
    setIniciado(true);
    setMostrarInputs(false);
  };

  const handleFinalizar = () => {
    const now = new Date();
    const horaFim = formatHora(now);
    setOs({ horaFim });
    setIniciado(false);
    setMostrarInputs(true);
    setHoraInicioManual(os.horaInicio || "");
    setHoraFimManual(horaFim);
  };

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (iniciado && startTime) {
      interval = setInterval(() => {
        const diff = Math.floor(
          (new Date().getTime() - startTime.getTime()) / 1000
        );
        setElapsed(diff);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [iniciado, startTime]);

  useEffect(() => {
    setOs({
      horaInicio: horaInicioManual,
      horaFim: horaFimManual,
    });
  }, [horaInicioManual, horaFimManual]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Controle de Tempo</Text>
        <Text style={styles.cardText}>
          Use o botão abaixo para iniciar ou finalizar o tempo da O.S.
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: iniciado ? "#D32F2F" : "#1C974B" },
          ]}
          onPress={iniciado ? handleFinalizar : handleIniciar}
        >
          <Text style={styles.buttonText}>
            {iniciado ? "Finalizar" : "Iniciar"}
          </Text>
        </TouchableOpacity>

        {iniciado && (
          <View style={styles.timerContainer}>
            <Text style={styles.timerLabel}>Tempo decorrido:</Text>
            <Text style={styles.timerValue}>{formatTimer(elapsed)}</Text>
          </View>
        )}

        {mostrarInputs && (
          <View style={styles.inputsContainer}>
            <Text style={styles.label}>Hora de Início:</Text>
            <TextInput
              value={horaInicioManual}
              onChangeText={setHoraInicioManual}
              style={styles.input}
              placeholder="00:00"
            />
            <Text style={styles.label}>Hora de Fim:</Text>
            <TextInput
              value={horaFimManual}
              onChangeText={setHoraFimManual}
              style={styles.input}
              placeholder="00:00"
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    padding: 16,
    backgroundColor: "#F2F2F2",
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  button: {
    padding: 12,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  timerContainer: {
    marginTop: 20,
  },
  timerLabel: {
    fontSize: 14,
    color: "#888",
  },
  timerValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  inputsContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
});
