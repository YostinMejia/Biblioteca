import { z } from "zod"

export class LibroSchema {

    static libroSchema = z.object({
        titulo: z.string({
            required_error: "El titulo es obligatorio",
            invalid_type_error: "Debe ser de tipo texto",
            message: "Debe de ser tipo string"

        }).min(3),
        autor: z.string().min(8, {
            message: "El nombre del autor no puede ser menor a 8 caracteres"
        }),
        anio: z.string(),
        cantidad_stock: z.number().min(0)
    })

    static async validarLibro(libro) {
        return await this.libroSchema.safeParseAsync(libro)
    }

    static async validarCrearLibro(libro) {
        const crearLibro = this.libroSchema.extend({ id: z.number() })
        return crearLibro.safeParseAsync(libro)
    }

}