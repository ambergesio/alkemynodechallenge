const config = require('./config');
const PORT = config.port;
const express = require('express');
const app = express();
const router = require('./router');
const cookieParser = require("cookie-parser");

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'Disney RESTful API in Express Node js',
          version: '1.0.0',
          description:
            'This is a REST API application made with Express.',
          contact: {
            name: 'Abel Martin Bergesio - abelmartinbergesio@icloud.com',
            url: 'https://github.com/ambergesio',
          },
        },
        servers: [
          {
            url: 'http://localhost:3000'
          },
        ],
      },
    apis: ['src/controllers/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// **************** TESTEO SEQUELIZE ************************ //

const sequelize = require('./sequelize');
sequelize.sync().then( () => {
    console.log('conexion exitosa con sqlite database');
}).catch((err) => {
    console.log('Ocurrió un error', err);
})


// ******************** MIDDLEWARES ************************ //

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// ************************ RUTAS ************************** //

app.use('/', router);


// ********************** SERVER INIT ********************** //

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
app.on('error', error => console.log(`Error en servidor ${error}`));