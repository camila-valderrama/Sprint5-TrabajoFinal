import { getAllCountries, agregarPais, obtenerTodos, eliminarTodos, obtenerPaisPorId, actualizarPais, eliminarPais } 
from '../services/paisesServices.mjs';

import { renderizarPais } from '../views/responseView.mjs';


//Se obtienen los países de la API y se almacenan en MongoDB
export async function obtenerCountriesController (req, res) {
    const countries = await getAllCountries(); // Llama a la función que trae todos los países desde la API.

    const respuesta = await agregarPais(countries); // Agrega los países a la base de datos.
    
    obtenerPaisesController(req,res); // Una vez cargados, llama al controlador para mostrar los países actualizados.
}


//Se obtienen los paises de la base de datos MongoDB
export async function obtenerPaisesController(req, res) {
    const paises = await obtenerTodos();

        res.render('dashboard', { paises });
}

//Se limpia la colección total de paises en la base de datos
export async function vaciarPaisesController(req, res) {
    const respuesta = await eliminarTodos();
    obtenerPaisesController(req, res);
}

//Se busca un pais por su ID
export async function obtenerPaisPorIdController (req, res) {
    const { id } = req.params;
    const pais = await obtenerPaisPorId(id);

    if(pais) {
        res.send(renderizarPais(pais));
    } else {
        res.status(404).send({ mensaje: "País no encontrado" });
    }
}

//Se envían las modificaciones a la base de datos MongoDB
export async function actualizarPaisController(req, res) {
    try {
        const pais = await actualizarPais(req.params.id, req.body);
        res.send(renderizarPais(pais))

    } catch (error) {
        console.error("Error al actualizar el pais:", error);
    }
}

export async function eliminarPaisController(req, res) {
    const pais = await eliminarPais(req.params.id);
    res.send(renderizarPais(pais))

     
}

//Se muestra el formulario para agregar un nuevo pais
export async function nuevoPaisController(req, res) {
    res.render('addPais');   
}

//Se envian los campos del formulario a la base de datos MongoDB
export async function agregarPaisesController(req, res) {
    const respuesta = await agregarPais(req.body);
    res.send(respuesta);

}

//Se renderiza la vista para editar un pais
export async function editarController(req, res) {
    const { pais , id } = req.query;
    res.render('editPais', { pais: JSON.parse(pais), id });
    
}




