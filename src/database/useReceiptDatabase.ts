import { openDatabaseAsync } from "expo-sqlite";

let dbInstance: Awaited<ReturnType<typeof openDatabaseAsync>> | null = null;

export const getDatabase = async () => {
  if (!dbInstance) {
    dbInstance = await openDatabaseAsync("receipt.db");

    // garante que a tabela existe antes de qualquer operação
    await dbInstance.execAsync(`
      CREATE TABLE IF NOT EXISTS receipt (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dados TEXT NOT NULL
      );
    `);
  }

  return dbInstance;
};

export const saveReceipt = async (receipt: object): Promise<void> => {
  const db = await getDatabase();
  const json = JSON.stringify(receipt);

  await db.runAsync("INSERT INTO receipt (dados) VALUES (?);", json);
};

export const listReceipt = async (): Promise<object[]> => {
  const db = await getDatabase();
  const results = await db.getAllAsync(
    "SELECT * FROM receipt ORDER BY id DESC;"
  );
  return results.map((row: any) => {
    try {
      const parsed = JSON.parse(row.dados);
      return { id: row.id, ...parsed };
    } catch (e) {
      console.warn("Erro ao parsear JSON:", e);
      return {};
    }
  });
};

export const attReceipt = async (
  id: number,
  receipt: object
): Promise<void> => {
  const db = await getDatabase();
  const json = JSON.stringify(receipt);
  await db.runAsync("UPDATE receipt SET dados = ? WHERE id = ?;", [json, id]);
};

export const clearReceipt = async (): Promise<void> => {
  const db = await getDatabase();
  await db.runAsync("DELETE FROM receipt;");
};
