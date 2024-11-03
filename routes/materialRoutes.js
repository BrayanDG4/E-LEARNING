const { Router } = require('express');
const { getMateriales, crearMaterial, actualizarMaterial, eliminarMaterial, obtenerMaterialesPorGrado, marcarMaterialVisto, desmarcarMaterialVisto } = require('../controllers/materialController');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getMateriales);
router.post('/', validarJWT, crearMaterial);
router.put('/:id', validarJWT, actualizarMaterial);
router.delete('/:id', validarJWT, eliminarMaterial);
router.get('/grado', validarJWT, obtenerMaterialesPorGrado);
router.get('/grado/:gradoId', validarJWT, obtenerMaterialesPorGrado);

module.exports = router;
