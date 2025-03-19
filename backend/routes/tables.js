import express from 'express';
import { createDatabaseConnection } from '../db/database.js';

const router = express.Router();

// Obtener las tablas de la base de datos
router.post("/", async (req, res) => {
  const { client, host, user, password, database } = req.body;

  if (!client || !database) {
    return res.status(400).json({ error: "Faltan datos de conexión" });
  }

  const db = createDatabaseConnection({ client, host, user, password, database });

  try {
    let tables;
    if (client === 'mysql2') {
      tables = await db.raw("SHOW TABLES");
      tables = tables[0].map((table) => Object.values(table)[0]);
    } else if (client === 'sqlite3') {
      const result = await db.raw(".tables");
      tables = result.map((row) => row.name);
    }

    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.destroy();
  }
});

export default router;
