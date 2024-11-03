const { Schema, model } = require("mongoose");

const MaterialSchema = Schema(
  {
    titulo: {
      type: String,
      required: [true, "El título es obligatorio"],
    },
    descripcion: {
      type: String,
      required: [true, "La descripción es obligatoria"],
    },
    archivoUrl: {
      type: String,
      required: [true, "El enlace del archivo es obligatorio"],
    },
    tipo: {
      type: String,
      enum: ["PDF", "video", "enlace"],
      required: true,
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
    profesor: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    grado: {
      // Asegúrate de que este campo esté bien definido
      type: Schema.Types.ObjectId,
      ref: "Grado", // Referencia al modelo 'Grado'
      required: true,
    },
  },
  { collection: "materiales", timestamps: true, versionKey: false }
);

module.exports = model("Material", MaterialSchema);
