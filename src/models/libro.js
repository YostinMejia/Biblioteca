import { pool } from "../db/db.js"

export class LibroModel {
    static async buscaTodo(tabla) {
        try {
            const [rows] = await pool.query('SELECT * FROM ?? ', [tabla]);
            return { "libros": rows, "completado": true }
        }
        catch (error) {
            return { "libros": {}, "completado": error }
        }
    }
    static async buscarPorNombre(nombre ,tabla) {
        try {
            const [rows] = await pool.query('SELECT * FROM ?? where `titulo` like ? or `autor` like ?', [tabla, '%' + nombre + '%', '%' + nombre + '%']);
            return { "libros": rows, "completado": true }
        }
        catch (error) {
            return { "libros": {}, "completado": error }
        }
    }
    static async nuevoLibro(datos){
        try {
            const { titulo, autor, anio, cantidad_stock } = datos
            const [rows] = await pool.query("insert into libro (titulo,autor,anio,cantidad_stock) values(?,?,?,?)", [titulo, autor, anio, cantidad_stock])
            return { "estado": rows, "completado": true }
        }
        catch (error) {
            return { "estado": {}, "completado": error }
        }
    }
    static async actualizarLibro(datos) {
        try {
            const { titulo, autor, anio, cantidad_stock,id } = datos
            const [rows] = await pool.query("update libro set titulo = ?, autor =?, anio = ?, cantidad_stock = ? where id = ?", [titulo, autor, anio, cantidad_stock,id])
            return { "estado": rows, "completado": true }
        }
        catch (error) {
            return { "estado": {}, "completado": error }
        }

    }
    static async eliminarLibro(id) {
        try {
            const [rows] = await pool.query("delete from libro where id= ?", [id])
            return { "estado": rows, "completado": true }
        }
        catch (error) {
            return { "estado": {}, "completado": error }
        }
    }
    
}

