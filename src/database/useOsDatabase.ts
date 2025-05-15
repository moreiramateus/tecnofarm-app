import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

export const salvarOS = async (os: object): Promise<void> => {
  if (!db) return;
  const json = JSON.stringify(os);

  await db.runAsync("INSERT INTO os (dados) VALUES (?);", [json]);
};

export const listarOS = async (): Promise<object[]> => {
  if (!db) return [];

  const results = await db.getAllAsync("SELECT * FROM os;");
  return results.map((row) => {
    try {
      const parsed = JSON.parse(row.dados);
      return { id: row.id, ...parsed };
    } catch (e) {
      console.warn("Erro ao parsear JSON:", e);
      return {};
    }
  });
};

export const limparOS = async (): Promise<void> => {
  if (!db) return;

  await db.runAsync("DELETE FROM os;");
};
