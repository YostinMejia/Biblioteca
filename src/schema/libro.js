import { z } from "zod"

export class LibroSchema {

    static baseLibroSchema = z.object({
        titulo: z.string({
            required_error: "El titulo es obligatorio",
            invalid_type_error: "Debe ser de tipo texto",
            message: "Debe de ser tipo string"

        }).min(3),
        autor: z.string().min(8, { message: "El nombre del autor no puede ser menor a 8 caracteres" }),
        anio: z.string().length(4)
    })


    static async validarDatos(libro) {
        return await this.baseLibroSchema.extend({cantidad_stock:z.number().optional()}).safeParseAsync(libro)

    }
    static async validarDatosBusqueda(querys) {
        const filtros = this.baseLibroSchema.merge(
            z.object({
                titulo: z.string().optional(),
                autor: z.string().optional(),
                anio: z.string().optional()
            }))
        return await filtros.safeParseAsync(querys)
    }

}