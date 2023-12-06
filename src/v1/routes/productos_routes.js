import { Router } from "express"
import { LibrosControlador } from "../../controllers/libroController.js"
export const router = Router()

router.get("/", LibrosControlador.buscar)

router.post("/", LibrosControlador.crear)
router.patch("/:id", LibrosControlador.actualizar)
router.delete("/:id", LibrosControlador.eliminar)
