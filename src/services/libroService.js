import { LibroBd } from "../db/libroORM.js"

export class LibroService {
    static async buscar(filtros) {
        return await LibroBd.buscar(filtros)
    }
    static async buscarTodo(){
        return await LibroBd.buscarTodo()
    }
 
    static async crear(datos) {
        return LibroBd.crear(datos)
    }
    static async actualizar(datos) {
        return LibroBd.actualizar(datos)

    }
    static async eliminar(id) {
        return LibroBd.eliminar(id)
    }

}
