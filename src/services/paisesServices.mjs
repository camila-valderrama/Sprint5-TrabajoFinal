import { CountryModel } from "../models/countryModel.mjs"
import PaisesRepository from "../repositories/paisesRepository.mjs";

const repository = PaisesRepository;

export function obtenerTodosLosPaises() {
    const paises = repository.obtenerTodos();
    return paises;
}

//Servicio para consumir la API
//Trae todos los países desde la API
export async function getAllCountries() {
    const API_URL = 'https://restcountries.com/v3.1/all';

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const todosLosPaises = CountryModel.fromAPI(data);
        return CountryModel.findSpanishSpeakingCountries(todosLosPaises);
    } catch (error) {
        console.error('Se produjo un error al consumir la API:', error);
        throw error;
        
    }
    
}

export async function getCountriesByRegion(region) {
    const allCountries = await this.getAllCountries();
    return CountryModel.findByRegion(allCountries, region);
}

//Se obtienen los paises de la colección de la base de datos y los trae.
export async function obtenerTodos() {
    const paises = repository.obtenerTodos();
    return paises;
}

//Se obtiene el pais por el id indicado
export async function obtenerPaisPorId(id) {
    const pais = repository.obtenerPorId(id);
    return pais;
}

//Se almacenan los paises en la colección de la base de datos MongoDB
export async function agregarPais(datos) {
    const pais = repository.agregarPais(datos);
    return pais;
}

//Se actualiza el pais en la base de datos
export async function actualizarPais(id, datos) {
   const pais = await repository.actualizarPais(id, datos);
   return pais;
}

//Se elimina un pais indicando el id
export async function eliminarPais(id) {
    const pais = await repository.eliminarPais(id);
    return pais;
}

//Se eliminan todos los paies de la colección de la base de datos
export async function eliminarTodos() {
    const paises = repository.eliminarTodos();
    return paises;
}