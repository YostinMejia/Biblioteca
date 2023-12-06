import { LibroService } from "../services/libroService.js";
import { LibroSchema } from "../schema/libro.js";

export class LibrosControlador {


    static async buscar(req, res) {
        const validacion = await LibroSchema.validarDatosBusqueda(req.query) //El schema válida que los datos sean correctos para procesar
        if (validacion.success) {
            if (Object.keys(validacion.data).length === 0) {  //Si no se pasan querys
                return res.json(await LibroService.buscarTodo())
            }
            const libros = await LibroService.buscar(validacion.data) // Busca los libros que cumplen con el query
            if (libros.success) { return res.json(libros) }
        }
        res.json(validacion.error.issues)
    }

    static async crear(req, res) {
        //Trim los datos
        req.body.cantidad_stock = Number(req.body.cantidad_stock)
        const validacion = await LibroSchema.validarDatos(req.body)
        if (validacion.success) {
            const { resultado, success } = await LibroService.crear(validacion.data)
            if (success) {
                return res.status(201).json(resultado)
            }
            return res.status(400).json({ message: "Ya existe un libro con ese nombre" })
        }
        res.json(validacion.error)
    }

    static async actualizar(req, res) {
        req.body.cantidad_stock = Number(req.body.cantidad_stock)
        const validacion = await LibroSchema.validarDatos(req.body)
        if (validacion.success) {
            validacion.data.id = Number(req.params.id)
            console.log(validacion);
            const { resultado, success } = await LibroService.actualizar(validacion.data)
            if (success) {
                return res.status(201).json(resultado)
            }
            return res.status(400).json(resultado)
        }
        res.json(validacion.error)
    }

    static async eliminar(req, res) { 
        const resultado = await LibroService.eliminar(Number(req.params.id))
        res.json(resultado)
    }
}
