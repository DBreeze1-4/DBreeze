import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Definir __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cambiar la ruta para acceder correctamente a la carpeta "routes" dentro de "backend"
const routesDir = path.join(__dirname, './routes');

// Leer todos los archivos en la carpeta "routes" excepto "index.js"
const routeFiles = fs.readdirSync(routesDir).filter(file => file !== 'index.js');

for (const file of routeFiles) {
  const filePath = path.join(routesDir, file);
  const fileUrl = `file://${filePath.replace(/\\/g, '/')}`; // Convert to file:// URL
  import(fileUrl).then(module => {
    const routeName = file.replace('.js', ''); // Eliminar la extensión ".js"
    router.use(`/${routeName}`, module.default);
  });
}

export default router;
