import { DataTypes, Op } from 'sequelize'
import { sequelize } from './conexion.js'

export class LibroBd {
    static libroBd = sequelize.define("libro", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        titulo: { type: DataTypes.STRING(45), allowNull: false },
        autor: { type: DataTypes.STRING(45), allowNull: false },
        anio: { type: DataTypes.STRING(45), allowNull: false },
        cantidad_stock: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 }
    }, { tableName: "libro", timestamps: false })

    static async crear(libro) {
        try {
            const [instancia, creado] = await this.libroBd.findOrCreate({//Busca un libro con lo que se pasa en where: y si no lo encuentra, lo crea
                where: { titulo: libro.titulo },
                defaults: {
                    autor: libro.autor,
                    anio: libro.anio,
                    cantidad_stock: libro.cantidad_stock
                }
            })
            return { "resultado": instancia, "success": creado }
        }
        catch (error) {
            return { "resultado": {}, "success": false }
        }
    }
    static async buscarTodo() {
        return this.libroBd.findAll()
    }
    static async buscar(filtros) {

        const AnularBusqueda = "°°°°";
        let { titulo, anio, autor } = filtros;

        const manejarUndefined = (valor) => (valor !== undefined ? valor : AnularBusqueda);

        titulo = manejarUndefined(titulo);
        autor = manejarUndefined(autor);
        anio = manejarUndefined(anio);

        try {
            const libros = await this.libroBd.findAll({
                where: {
                    [Op.or]: [
                        { titulo: { [Op.substring]: titulo } },
                        { autor: { [Op.substring]: autor } },
                        { anio: { [Op.substring]: anio } }]
                }
            })
            return { "libros": libros, "success": true }
        }
        catch (error) {
            return { "libros": {}, "success": error }
        }
    }

    static async actualizar(datos) {
        try {
            const libroExistente = await this.libroBd.findByPk(datos.id);
            if (libroExistente === null) { return { "resultado": 'Libro no encontrado', "success": false, }; }
            const estado = await this.libroBd.update({
                titulo: datos.titulo,
                autor: datos.autor,
                anio: datos.anio,
                cantidad_stock: datos.cantidad_stock
            }, { where: { id: datos.id } })
            return { "resultado": estado, "success": true }
        }
        catch (error) {
            return { "resultado": {}, "success": error }
        }
    }

    static async eliminar(id) {
        try {
            const resultado = await this.libroBd.destroy({
                where: { id: id }
            })
            return { "resultado": resultado, "success": true }
        }
        catch (error) {
            return { "resultado": {}, "success": error }
        }
    }

}
