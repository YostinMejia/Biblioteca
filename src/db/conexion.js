import { Sequelize} from 'sequelize'

import dotenv from "dotenv"
dotenv.config()

export const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: 'mysql'
    }
)
async function testearConexion() {
    try {
        await sequelize.authenticate()
        console.log("Conexión establecida con la bd correctamente");
    } catch (error) {
        console.log("Conexión fallida con la bd", error);
    }
}
testearConexion()