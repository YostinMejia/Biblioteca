import { LibroModel } from "../models/libro.js";
import { LibroSchema } from "../schema/libro.js"; 

export class LibrosControlador {

    static async mostrarLibros(req, res) {
        //Se cogen los query y la clave se pone como nombre de la 
        //columna y el valor el metodo por el cual se va a filtrar
        //Se podría hacer un ordenamiento general para cada query que se ponga en la url
        const libros = await LibroModel.buscaTodo("libro")
        if (libros.completado) {
            return res.json(libros)
        }
        res.json(libros.completado)
    }
    
    static async mostrarFiltrados(req, res) {
        const libros = await LibroModel.buscarPorNombre(req.params.nombre, "libro")
        if (libros.completado) {
            return res.json(libros)
        }
        res.json(libros.completado)
    }

    static async nuevoLibro(req, res) {
        const validacion = await LibroSchema.validarLibro(req.body)
        if (validacion.success){
            return res.status(201).json(await LibroModel.nuevoLibro(validacion.data))
        }
        res.json(validacion)
    }

    static async actualizarLibro(req, res) {
        const estado = await LibroModel.nuevoLibro(req.body)
        res.json(estado)
    }
    static async eliminarLibro(req, res) {
        const estado = await LibroModel.eliminarLibro(req.params.id)
        res.json(estado)
    }

}


