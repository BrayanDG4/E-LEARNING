const { Schema, model } = require("mongoose");

const CalificacionSchema = new Schema({
  estudiante: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  evaluacion: {
    type: Schema.Types.ObjectId,
    ref: "Evaluacion",
    required: true,
  },
  respuestas: [
    {
      preguntaId: String,
      respuesta: String,
      esCorrecta: Boolean,
    },
  ],
  puntajeObtenido: {
    type: Number,
    required: true,
  },
  puntajeTotal: {
    type: Number,
    required: true,
  },
  porcentaje: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Calificacion", CalificacionSchema);
