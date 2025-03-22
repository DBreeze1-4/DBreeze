import express from 'express';
import { createDatabaseConnection } from '../db/database.js';
import { formatearRespuesta } from '../normalizer.js'; // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Obtener los datos de una tabla específica
router.post("/:name", async (req, res) => {
  const { client, host, user, password, database, token, port, pagina = 1, limite = 20 } = req.body;
  const { name } = req.params;

  if (!client || !database) {
    return res.status(400).json({ error: "Faltan datos de conexión" });
  }

  const db = createDatabaseConnection({ client, host, user, password, database, token, port });

  try {
    const offset = (pagina - 1) * limite;

    const datos = await db.select("*").from(name).limit(limite).offset(offset);
    const total = await db(name).count("* as total");

    const respuesta = formatearRespuesta(datos, {
      pagina,
      limite,
      total: total[0].total
    });

    res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.destroy();
  }
});

export default router;