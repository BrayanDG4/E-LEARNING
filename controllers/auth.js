const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');
const Estudiante = require('../models/estudiante_ebr');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');

const login = async (req, res = response) => {

    try {
        const { correo, password, modalidad } = req.body;

        const usuarioDB = await Usuario.findOne({ correo });
        console.log('Usuario encontrado:', usuarioDB); // Depuración

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar el password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        console.log('Password válido:', validPassword); // Depuración

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);
        console.log('Token generado:', token); // Depuración

        // Obtener información adicional si el usuario es un estudiante
        let estudiante = null;
        if (usuarioDB.rol === 'STUDENT_ROLE') {
            estudiante = await Estudiante.findOne({ userId: usuarioDB._id }).populate('grado', 'nombre descripcion estado');
        }

        res.json({
            ok: true,
            msg: 'login',
            usuario: {
                uid: usuarioDB.id,
                nombre: usuarioDB.nombre,
                correo: usuarioDB.correo,
                password: usuarioDB.password,
                img: usuarioDB.img,
                rol: usuarioDB.rol,
                modalidad: modalidad
            },
            estudiante,  // Incluir la información del estudiante si existe
            menu: getMenuFrontEnd(usuarioDB.rol, modalidad),
            token
        });

    } catch (error) {
        console.log('Error en el proceso de login:', error); // Depuración
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJWT(uid);

    // Obtener el usuario por UID
    const usuario = await Usuario.findById(uid);

    // Obtener información adicional si el usuario es un estudiante
    let estudiante = null;
    if (usuario.rol === 'STUDENT_ROLE') {
        estudiante = await Estudiante.findOne({ userId: usuario._id }).populate('grado', 'nombre descripcion estado');
    }

    res.json({
        ok: true,
        token,
        usuario,
        estudiante,  // Incluir la información del estudiante si existe
        menu: getMenuFrontEnd(usuario.rol)
    });

}

module.exports = {
    login,
    renewToken
}
