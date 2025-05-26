import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

let db: SQLite.SQLiteDatabase | null = null;

export const initializeDatabaseOs = async (): Promise<void> => {
  if (Platform.OS === "web") {
    console.warn("SQLite não é suportado na Web.");
    return;
  }

  db = await SQLite.openDatabaseAsync("os.db");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS os (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dados TEXT NOT NULL
    );
  `);
};

export const initializeDatabaseReceits = async (): Promise<void> => {
  if (Platform.OS === "web") {
    console.warn("SQLite não é suportado na Web.");
    return;
  }

  db = await SQLite.openDatabaseAsync("os.db");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS os (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dados TEXT NOT NULL
    );
  `);
};
