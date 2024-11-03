const { Router } = require("express");
const {
  obtenerEvaluaciones,
  crearEvaluacion,
  actualizarEstadoEvaluacion,
  eliminarEvaluacion,
  enviarRespuestas,
  obtenerCalificacionesPorEvaluacion,
  obtenerTodasLasCalificaciones,
} = require("../controllers/evaluacionController");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, obtenerEvaluaciones);
router.post("/", validarJWT, crearEvaluacion);
router.put("/:id/habilitar", validarJWT, actualizarEstadoEvaluacion);
router.delete("/:id", validarJWT, eliminarEvaluacion);
router.post("/:evaluacionId/responder", validarJWT, enviarRespuestas); // Asegúrate de que esta ruta esté definida
router.get('/:evaluacionId/calificaciones', validarJWT, obtenerCalificacionesPorEvaluacion);
router.get('/calificaciones', validarJWT, obtenerTodasLasCalificaciones);


module.exports = router;
