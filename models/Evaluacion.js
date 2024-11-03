const { Schema, model } = require("mongoose");

const OpcionSchema = Schema({
  texto: { type: String, required: true },
  correcta: { type: Boolean, required: true },
});

const PreguntaSchema = Schema({
  pregunta: { type: String, required: true },
  opciones: [OpcionSchema],
  respuestaCorrecta: { type: String, required: true },
});

const EvaluacionSchema = Schema(
  {
    titulo: {
      type: String,
      required: [true, "El título es obligatorio"],
    },
    descripcion: {
      type: String,
      required: [true, "La descripción es obligatoria"],
    },
    periodo: {
      type: String,
      enum: [
        "Primer Periodo",
        "Segundo Periodo",
        "Tercer Periodo",
        "Cuarto Periodo",
      ],
      required: true,
    },
    preguntas: [PreguntaSchema],
    profesor: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    grado: {
      type: Schema.Types.ObjectId,
      ref: "Grado",
      required: true,
    },
    habilitada: {
      type: Boolean,
      default: true,
    },
  },
  { collection: "evaluaciones", timestamps: true, versionKey: false }
);

module.exports = model("Evaluacion", EvaluacionSchema);
