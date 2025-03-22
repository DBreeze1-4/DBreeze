import express from 'express';
import { createDatabaseConnection } from '../db/database.js';

const router = express.Router();

// Obtener los datos de una tabla específica
router.post("/:name", async (req, res) => {
  const { client, host, user, password, database, token, port } = req.body;
  const { name } = req.params;

  if (!client || !database) {
    return res.status(400).json({ error: "Faltan datos de conexión" });
  }

  const db = createDatabaseConnection({ client, host, user, password, database, token, port });

  try {
    const data = await db.select("*").from(name);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.destroy();
  }
});

export default router;
