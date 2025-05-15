import { openDatabaseAsync } from "expo-sqlite";

let dbInstance: Awaited<ReturnType<typeof openDatabaseAsync>> | null = null;

export const getDatabase = async () => {
  if (!dbInstance) {
    dbInstance = await openDatabaseAsync("os.db");

    // garante que a tabela existe antes de qualquer operação
    await dbInstance.execAsync(`
      CREATE TABLE IF NOT EXISTS os (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dados TEXT NOT NULL
      );
    `);
  }

  return dbInstance;
};

export const salvarOS = async (os: object): Promise<void> => {
  const db = await getDatabase();
  const json = JSON.stringify(os);

  await db.runAsync("INSERT INTO os (dados) VALUES (?);", json);
};

export const listarOS = async (): Promise<object[]> => {
  const db = await getDatabase();
  const results = await db.getAllAsync("SELECT * FROM os ORDER BY id DESC;");
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

export const atualizarOS = async (id: number, os: object): Promise<void> => {
  const db = await getDatabase();
  const json = JSON.stringify(os);
  await db.runAsync("UPDATE os SET dados = ? WHERE id = ?;", [json, id]);
};

export const limparOS = async (): Promise<void> => {
  const db = await getDatabase();
  await db.runAsync("DELETE FROM os;");
};
