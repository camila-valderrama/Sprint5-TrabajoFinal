import express from 'express';
import { actualizarPaisController, agregarPaisesController, editarController, eliminarPaisController, nuevoPaisController, obtenerCountriesController, obtenerPaisesController, obtenerPaisPorIdController, vaciarPaisesController } from '../controllers/paisesController.mjs';
import { paisValidation } from '../validators/paisValidator.mjs'
import { handleValidationErrors } from "../middlewares/errorMiddleware.mjs";

const router = express.Router();

//Rutas
router.get('/', (req, res) => { res.render('home', {'title':'Por el Mundo'})});
router.get('/paises/obtener', obtenerCountriesController);
router.get('/paises', obtenerPaisesController);
router.get('/paises/id/:id', obtenerPaisPorIdController);
router.get('/paises/vaciar', vaciarPaisesController);
router.get('/paises/nuevo', nuevoPaisController);

router.get('/paises/editar/', editarController) //Muestra el formulario
router.post('/paises/agregar/', paisValidation(), handleValidationErrors, agregarPaisesController)
router.put('/paises/actualizar/:id', paisValidation(), handleValidationErrors, actualizarPaisController);
router.delete('/paises/eliminar/:id', eliminarPaisController);

export default router;