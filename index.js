const { dbConnection } = require('./database/config');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
// const path = require('path');

const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

console.log('JWT_SECRET:', process.env.JWT_SECRET); // Agregar esta línea para depuración

// Base de datos
dbConnection();

// Rutas

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function(req, res){
//     res.redirect('/index.html');
// });

app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/modalidades', require('./routes/modalidades'));
app.use('/api/grados', require('./routes/grados'));
app.use('/api/secciones', require('./routes/secciones'));
app.use('/api/tipos_activo', require('./routes/tipos_activo'));
app.use('/api/activos', require('./routes/activos'));
app.use('/api/inmobiliarios', require('./routes/inmobiliarios'));
app.use('/api/categoria_uniforme', require('./routes/categoria_uniforme'));
app.use('/api/uniformes', require('./routes/uniformes'));
app.use('/api/ventas_uniforme', require('./routes/ventas_uniforme'));
app.use('/api/docentes', require('./routes/docentes'));
app.use('/api/estudiantes_ebr', require('./routes/estudiantes_ebr'));
app.use('/api/estudiantes_ceba', require('./routes/estudiantes_ceba'));
app.use('/api/estudiantes_residencia', require('./routes/estudiantes_residencia'));
app.use('/api/pagos_ebr', require('./routes/pagos_ebr'));
app.use('/api/pagos_ceba', require('./routes/pagos_ceba'));
app.use('/api/pagos_residencia', require('./routes/pagos_residencia'));
app.use('/api/libros', require('./routes/libros'));
app.use('/api/prestamo_libros', require('./routes/prestamo_libros'));
app.use('/api/mapas', require('./routes/mapas'));
app.use('/api/laboratorios', require('./routes/laboratorios'));
app.use('/api/prestamo_mapas', require('./routes/prestamo_mapas'));
app.use('/api/reportes', require('./routes/reportes'));
app.use('/api/evaluaciones', require('./routes/evaluacionRoutes'));
app.use('/api/materiales', require('./routes/materialRoutes'));


app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});