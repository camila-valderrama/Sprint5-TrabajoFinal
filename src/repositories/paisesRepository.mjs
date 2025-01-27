 
import IRepository from "./IRepository.mjs";
import paisModel from "../models/paisModel.mjs"

class PaisesRepository extends IRepository {
    async obtenerPorId(id) {
        try {
            return await paisModel.findById(id).lean();

        } catch (error) {
            console.error(`se produjo un error: ${error} `);
        }
    }

    async agregarPais(datos) {
        const pais= await paisModel.create(datos);
        return pais;
    }

    async obtenerTodos() {
        return await paisModel.find({  creador: 'Camila Valderrama', 'name.nativeName.spa.official':{ $exists: true } }).lean(); //Trae unicamente los documentos creados por mi, y que tengan un nombre de pais
    }

    async eliminarTodos() {
        return await paisModel.deleteMany({  creador: 'Camila Valderrama', 'name.nativeName.spa.official':{ $exists: true } }).lean(); //Elimina unicamente los documentos creados por mi, y que tengan un nombre de pais
    }

    async actualizarPais(id, datos) {

        try {
            const pais= await paisModel.findByIdAndUpdate( id, { $set:datos }, { new : true , upsert: true}).lean();
            return pais;

        } catch (error) {
            throw('Se produjo un error al intentar actualizar: ',error);
        }
    }

    async eliminarPais(id) {
        const pais= await paisModel.findByIdAndDelete(id).lean();
        return pais;
    }
}

export default new PaisesRepository();