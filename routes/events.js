//  events routes
// /api/events
const { Router } = require("express")
const { check } =require("express-validator")
const { isDate } = require("../helpers/isDate")
const { validarJWT } = require("../middlewares/validar-jwt")
const { validarCampos } = require("../middlewares/validar-campos")
const { getEventos, crearEvento, actualizarEvento, eliminarEvento }=require("../controllers/events")

const router = Router()

// Todas tienen que pasar por la validacion de JWT antes
router.use(validarJWT)

//obtener evento
router.get("/", getEventos )

// crear un nuevo evento
router.post("/", 
     [
        check("title", "El titulo es obligatorio").not().isEmpty(),
        check("start", "fecha de inicio es obligatoria").custom(isDate),
        check("end", "fecha de finalizacion es obligatoria").custom(isDate),
        validarCampos
     ],
    crearEvento 
)

// Actualizando evento
router.put("/:id", actualizarEvento )

// Borrar evento
router.delete("/:id", eliminarEvento )


module.exports = router