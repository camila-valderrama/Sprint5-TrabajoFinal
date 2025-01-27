import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import router from './routes/paisesRoutes.mjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import expressLayouts from 'express-ejs-layouts';

const app = express();
const PORT = process.env.PORT || 3500;

// Simular __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurar carpeta estática
app.use(express.static(join(__dirname, '..', 'public')));

// Configurar directorio de vistas y motor de plantillas
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Configurar express ejs Layout
app.use(expressLayouts);
app.set('layout', 'layout');

//Middleware para parsear JSON
app.use(express.json());

//Conexión a MongoDB
connectDB();

//Configuración de rutas
app.use('/', router);

//Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

//Iniciar el servidor
app.listen(PORT, `0.0.0.0` , () => {
    console.log(`Servidor levantado en el puerto ${PORT}, desde el servidor`);
});