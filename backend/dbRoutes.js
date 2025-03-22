import express from "express";
import knex from "knex";

const router = express.Router();

// Crear la conexión a la base de datos de forma dinámica
const createDbConnection = ({ client, host, user, password, database }) => {
  const config = {
    client: client,  // mysql o sqlite
    connection: {},
  };

  if (client === 'mysql2') {
    config.connection = {
      host: host,
      user: user,
      password: password,
      database: database,
    };
  } else if (client === 'sqlite3') {
    config.connection = {
      filename: database,  // El archivo de la base de datos SQLite
    };
  } else {
    throw new Error("Cliente no soportado");
  }

  return knex(config);
};

// Obtener las tablas de la base de datos
router.post("/tables", async (req, res) => {
  const { client, host, user, password, database } = req.body;

  if (!client || !database) {
    return res.status(400).json({ error: "Faltan datos de conexión" });
  }

  const db = createDbConnection({ client, host, user, password, database });

  try {
    let tables;
    if (client === 'mysql2') {
      tables = await db.raw("SHOW TABLES");
      tables = tables[0].map((table) => Object.values(table)[0]);
    } else if (client === 'sqlite3') {
      tables = await db.raw("SELECT name FROM sqlite_master WHERE type='table'");
      tables = tables[0].map((table) => table.name);
    }

    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.destroy();
  }
});

// Obtener los datos de una tabla específica
router.post("/table/:name", async (req, res) => {
  const { client, host, user, password, database } = req.body;
  const { name } = req.params;

  if (!client || !database) {
    return res.status(400).json({ error: "Faltan datos de conexión" });
  }

  const db = createDbConnection({ client, host, user, password, database });

  try {
    const data = await db.select("*").from(name);
    console.log("Datos obtenidos de la base de datos:", data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.destroy();
  }
});

export default router;
