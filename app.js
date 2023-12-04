import dotenv from "dotenv"
dotenv.config()
import express, { json } from "express"
const app = express()

import {router} from "./src/routes/productos_routes.js"

app.use(json())
app.use("/productos",router)


app.listen(process.env.PORT,()=>console.log("servidor iniciado"))

app.use("*",(req,res)=>{res.status(404).send("Ruta no encontrada")})
