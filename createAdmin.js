const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Usuario = require('./models/usuario');
require('dotenv').config();

const crearAdmin = async () => {
    await mongoose.connect(process.env.DB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const adminData = {
        nombre: 'Admin User',
        correo: 'admin@example.com',
        password: bcrypt.hashSync('securepassword', bcrypt.genSaltSync()),
        rol: 'ADMIN_ROLE'
    };

    const admin = new Usuario(adminData);

    try {
        await admin.save();
        console.log('Usuario administrador creado con éxito');
    } catch (error) {
        console.error('Error al crear el usuario administrador:', error);
    } finally {
        mongoose.connection.close();
    }
};

crearAdmin();
