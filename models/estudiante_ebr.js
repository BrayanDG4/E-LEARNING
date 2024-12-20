const { Schema, model, default: mongoose } = require("mongoose");

const EstudianteSchema = Schema(
  {
    nombres: {
      type: String,
      required: [true, "Los nombres son obligatorios"],
    },
    apellidos: {
      type: String,
      required: [true, "Los apellidos son obligatorios"],
    },
    dni: {
      type: String,
      required: [true, "El dni es obligatorio"],
    },
    sexo: {
      type: String,
      emun: ["M", "F"],
      default: "M",
      required: [true, "El sexo es obligatorio"],
    },
    correo: {
      type: String,
    },
    celular: {
      type: String,
    },
    domicilio: {
      type: String,
    },
    fecha_nacimiento: {
      type: Date,
    },
    nombre_padres: {
      type: String,
    },
    celular_padres: {
      type: String,
    },
    correo_padres: {
      type: String,
    },
    colegio_procedencia: {
      type: String,
    },
    tipo_estudiante: {
      type: String,
      enum: ["RESIDENCIA", "EXTERNA", "OTRO"],
      required: [true, "El tipo de estudiante es obligatorio"],
    },
    grado: {
      type: Schema.Types.ObjectId,
      ref: "Grado",
      required: false,
    },
    turno: {
      type: String,
      enum: ["MAÑANA", "TARDE", "NORMAL"],
      default: "NORMAL",
      required: [true, "El turno es obligatorio"],
    },
    img: {
      type: String,
    },
    observaciones: {
      type: String,
    },
    estado: {
      type: String,
      enum: ["ACTIVO", "INACTIVO", "RETIRADO"],
      default: "ACTIVO",
      required: [true, "El estado es obligatorio"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  { collection: "estudiante_EBR", timestamps: true, versionKey: false }
);

module.exports = model("Estudiante_EBR", EstudianteSchema);
