import { Router } from "express"
import {LibrosControlador} from "../controllers/libros.js"
export const router = Router()

router.get("/",LibrosControlador.mostrarLibros)
router.get("/:nombre",LibrosControlador.mostrarFiltrados)
    
router.post("/:id",LibrosControlador.nuevoLibro)
router.put("/:id",LibrosControlador.actualizarLibro)
router.delete("/:id",LibrosControlador.eliminarLibro)
