const Evaluacion = require("../models/Evaluacion");
const Calificacion = require("../models/Calificacion");

const crearEvaluacion = async (req, res) => {
  try {
    const { titulo, descripcion, periodo, preguntas, grado } = req.body;
    const profesor = req.uid;

    const nuevaEvaluacion = new Evaluacion({
      titulo,
      descripcion,
      periodo,
      preguntas,
      grado,
      profesor,
    });

    await nuevaEvaluacion.save();

    res.status(201).json({
      ok: true,
      evaluacion: nuevaEvaluacion,
    });
  } catch (error) {
    console.log("Error al crear la evaluación:", error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const obtenerEvaluaciones = async (req, res) => {
  try {
    const evaluaciones = await Evaluacion.find()
      .populate("grado", "nombre")
      .populate("profesor", "nombre");
    res.json(evaluaciones);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarEstadoEvaluacion = async (req, res) => {
  const { id } = req.params;
  const { habilitada } = req.body;

  try {
    const evaluacion = await Evaluacion.findById(id);

    if (!evaluacion) {
      return res.status(404).json({
        ok: false,
        msg: "Evaluación no encontrada",
      });
    }

    evaluacion.habilitada = habilitada;
    await evaluacion.save();

    res.json({
      ok: true,
      msg: `Evaluación ${
        habilitada ? "habilitada" : "deshabilitada"
      } correctamente`,
      evaluacion,
    });
  } catch (error) {
    console.log("Error al actualizar el estado de la evaluación:", error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const eliminarEvaluacion = async (req, res) => {
  const { id } = req.params;

  try {
    const evaluacion = await Evaluacion.findByIdAndDelete(id);

    if (!evaluacion) {
      return res.status(404).json({
        ok: false,
        msg: "Evaluación no encontrada",
      });
    }

    res.json({
      ok: true,
      msg: "Evaluación eliminada",
    });
  } catch (error) {
    console.log("Error al eliminar la evaluación:", error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const enviarRespuestas = async (req, res) => {
  try {
    const { evaluacionId } = req.params;
    const { respuestas } = req.body;
    const estudiante = req.uid;

    const evaluacion = await Evaluacion.findById(evaluacionId);
    if (!evaluacion) {
      return res.status(404).json({
        ok: false,
        msg: "Evaluación no encontrada",
      });
    }

    let puntajeObtenido = 0;
    const puntajeTotal = evaluacion.preguntas.length;

    const retroalimentacion = evaluacion.preguntas.map((pregunta) => {
      const respuestaEstudiante = respuestas[pregunta._id] || "";
      const esCorrecta = respuestaEstudiante === pregunta.respuestaCorrecta;

      if (esCorrecta) {
        puntajeObtenido += 1;
      }

      return {
        pregunta: pregunta.pregunta,
        respuestaCorrecta: pregunta.respuestaCorrecta,
        respuestaEstudiante,
        esCorrecta,
      };
    });

    const porcentaje = (puntajeObtenido / puntajeTotal) * 100;

    // Guardar la calificación en la base de datos
    const nuevaCalificacion = new Calificacion({
      estudiante,
      evaluacion: evaluacionId,
      respuestas: retroalimentacion.map((item) => ({
        preguntaId: item._id,
        respuesta: item.respuestaEstudiante,
        esCorrecta: item.esCorrecta,
      })),
      puntajeObtenido,
      puntajeTotal,
      porcentaje,
    });

    await nuevaCalificacion.save();

    res.json({
      ok: true,
      puntajeObtenido,
      puntajeTotal,
      porcentaje,
      retroalimentacion,
    });
  } catch (error) {
    console.error("Error al procesar las respuestas:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al procesar las respuestas",
    });
  }
};

const obtenerCalificacionesPorEvaluacion = async (req, res) => {
  try {
    const { evaluacionId } = req.params;

    const calificaciones = await Calificacion.find({ evaluacion: evaluacionId })
      .populate("estudiante", "nombre email")
      .populate("evaluacion", "titulo");

    res.json({
      ok: true,
      calificaciones,
    });
  } catch (error) {
    console.error("Error al obtener las calificaciones:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener las calificaciones",
    });
  }
};

const obtenerTodasLasCalificaciones = async (req, res) => {
  try {
    const calificaciones = await Calificacion.find()
      .populate('estudiante', 'nombre email')
      .populate('evaluacion', 'titulo');
    
    res.json({
      ok: true,
      calificaciones,
    });
  } catch (error) {
    console.error('Error al obtener las calificaciones:', error);
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener las calificaciones',
    });
  }
};

module.exports = {
  crearEvaluacion,
  obtenerEvaluaciones,
  actualizarEstadoEvaluacion,
  eliminarEvaluacion,
  enviarRespuestas,
  obtenerEvaluaciones,
  obtenerCalificacionesPorEvaluacion,
  obtenerTodasLasCalificaciones,
};
