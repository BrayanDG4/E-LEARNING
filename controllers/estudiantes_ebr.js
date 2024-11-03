const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const Estudiante = require("../models/estudiante_ebr");

// Obtener todos los estudiantes
const getEstudiantes = async (req, res = response) => {
  try {
    const estudiantes = await Estudiante.find().populate(
      "grado",
      "nombre descripcion estado createdAt updatedAt"
    );

    res.json(estudiantes);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

// Obtener un estudiante por ID
const getEstudiante = async (req, res = response) => {
  try {
    const estudiante = await Estudiante.findById(req.params.id).populate(
      "grado",
      "nombre descripcion estado createdAt updatedAt"
    );

    if (!estudiante) {
      return res.status(404).json({
        ok: false,
        msg: "Estudiante no encontrado",
      });
    }

    res.json(estudiante);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

// Registrar un nuevo estudiante
const registrarEstudiante = async (req, res = response) => {
  try {
    const {
      nombres,
      apellidos,
      dni,
      sexo,
      celular,
      fecha_nacimiento,
      nombre_padres,
      celular_padres,
      correo_padres,
      colegio_procedencia,
      tipo_estudiante,
      grado,
      turno,
      img,
      estado,
      usuario // Recibimos el ID del usuario asociado
    } = req.body;

    // Verificar si el estudiante ya existe
    const estudianteDB = await Estudiante.findOne({ dni });
    if (estudianteDB) {
      return res.status(400).json({
        ok: false,
        msg: "El estudiante con ese DNI ya existe",
      });
    }

    // Obtener el correo del usuario seleccionado
    const usuarioDB = await Usuario.findById(usuario);
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }
    const correo = usuarioDB.correo;

    // Crear el estudiante y vincular el userId
    const data = {
      nombres,
      apellidos,
      dni,
      sexo,
      correo, // Usamos el correo del usuario seleccionado
      celular,
      fecha_nacimiento,
      nombre_padres,
      celular_padres,
      correo_padres,
      colegio_procedencia,
      tipo_estudiante,
      grado,
      turno,
      img,
      estado,
      userId: usuario, // Vinculación del estudiante con el usuario
    };

    const estudiante = new Estudiante(data);
    await estudiante.save();

    // Devolver la lista actualizada de estudiantes
    const estudiantes = await Estudiante.find().populate(
      "grado",
      "nombre descripcion estado createdAt updatedAt"
    );
    res.status(201).json({
      ok: true,
      estudiantes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

// Actualizar un estudiante
const actualizarEstudiante = async (req, res = response) => {
  try {
    const { id } = req.params;
    const {
      nombres,
      apellidos,
      dni,
      sexo,
      celular,
      domicilio,
      fecha_nacimiento,
      nombre_padres,
      celular_padres,
      correo_padres,
      colegio_procedencia,
      tipo_estudiante,
      grado,
      turno,
      img,
      estado,
    } = req.body;

    const estudianteDB = await Estudiante.findById(id);

    if (!estudianteDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Estudiante no encontrado'
      });
    }

    // Actualizar los datos del estudiante
    const data = {
      nombres,
      apellidos,
      dni,
      sexo,
      celular,
      domicilio,
      fecha_nacimiento,
      nombre_padres,
      celular_padres,
      correo_padres,
      colegio_procedencia,
      tipo_estudiante,
      grado,
      turno,
      img,
      estado,
    };

    const estudianteActualizado = await Estudiante.findByIdAndUpdate(id, data, {
      new: true,
    }).populate("grado", "nombre descripcion estado createdAt updatedAt");

    res.json({
      ok: true,
      estudiante: estudianteActualizado,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

// Eliminar un estudiante
const eliminarEstudiante = async (req, res = response) => {
  try {
    const { id } = req.params;

    const estudiante = await Estudiante.findByIdAndDelete(id);

    if (!estudiante) {
      return res.status(404).json({
        ok: false,
        msg: 'Estudiante no encontrado'
      });
    }

    // Opcional: eliminar el usuario asociado al estudiante
    // await Usuario.findByIdAndDelete(estudiante.userId);

    res.json({
      ok: true,
      msg: 'Estudiante eliminado',
      estudiante,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

// Obtener un estudiante por DNI
const getEstudianteByDni = async (req, res = response) => {
  try {
    const { dni } = req.params;

    const estudiante = await Estudiante.findOne({ dni });

    if (!estudiante) {
      return res.status(404).json({
        ok: false,
        msg: "El estudiante no ha sido encontrado",
      });
    }

    res.json({
      ok: true,
      estudiante,
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
  getEstudiantes,
  getEstudiante,
  registrarEstudiante,
  actualizarEstudiante,
  eliminarEstudiante,
  getEstudianteByDni,
};
