const { response } = require("express");
const Material = require("../models/Material");
const Estudiante = require("../models/estudiante_ebr");

const getMateriales = async (req, res = response) => {
  try {
    const materiales = await Material.find()
      .populate("profesor", "nombre")
      .populate("grado", "nombre"); // Asegúrate de que 'grado' se está populando correctamente

    res.json(materiales);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const crearMaterial = async (req, res = response) => {
  try {
    const profesor = req.uid; // Middleware should assign the uid here
    const material = new Material({ ...req.body, profesor });

    await material.save();
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al crear material",
      error: error.message, // Add more error details
    });
  }
};

const actualizarMaterial = async (req, res = response) => {
  const { id } = req.params;
  try {
    const material = await Material.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(material);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const eliminarMaterial = async (req, res = response) => {
  const { id } = req.params;
  try {
    await Material.findByIdAndDelete(id);
    res.json({ msg: "Material eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const obtenerMaterialesPorGrado = async (req, res = response) => {
  try {
    // Obtener todos los materiales sin filtrar por el grado del estudiante
    const materiales = await Material.find().populate("grado", "nombre");
    res.json({
      ok: true,
      materiales,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getMateriales,
  crearMaterial,
  actualizarMaterial,
  eliminarMaterial,
  obtenerMaterialesPorGrado,
};
