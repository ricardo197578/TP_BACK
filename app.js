// Archivo principal de la aplicación Express
// Configura el servidor, middlewares, rutas y manejo de errores

// Importa Express framework para crear el servidor web
const express = require("express");

// Crea la instancia de la aplicación Express
// 'app' es el objeto principal que manejará las peticiones HTTP
const app = express();

// Importa las rutas de comercios (endpoints específicos de la API)
// Las rutas contienen la lógica de mapeo URL → controlador
const comercioRoutes = require("./routes/comercio.routes");

// Importa el middleware manejador de errores global
// Captura cualquier error lanzado con next(error) en la aplicación
const errorHandler = require("./middlewares/errorHandler");

// Importa el middleware para rutas no encontradas (404)
// Se ejecuta cuando ninguna ruta coincide con la petición
const notFound = require("./middlewares/notFound");

// Importa el puerto desde el archivo de configuración
// Destructuring: extrae la variable PORT del objeto exportado
const { PORT } = require("./config/env");

// MIDDLEWARES GLOBALES 

// Middleware integrado de Express para parsear JSON
// Convierte automáticamente el body de las peticiones con Content-Type: application/json
// Los datos parseados estarán disponibles en req.body
// Ejemplo: req.body.nombre, req.body.email, etc.
app.use(express.json());

// RUTAS DE LA API
const comercioRoutes = require("./src/routes/comercio.routes");
const tiendaRoutes = require("./src/routes/tienda.routes");
const transaccionRoutes = require("./src/routes/transaccion.routes");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", "./views");

// rutas
app.use("/comercios", comercioRoutes);
app.use("/tiendas", tiendaRoutes);
app.use("/transacciones", transaccionRoutes);

// home
app.get("/", (req, res) => {
  res.render("index");
});
app.use(express.static("public"));
// Monta las rutas de comercios en el path base "/comercios"
// Todas las rutas definidas en comercioRoutes estarán prefijadas con "/comercios"
// Ejemplos:
//   GET /comercios           → listar todos
//   GET /comercios/:id       → obtener uno
//   POST /comercios          → crear nuevo
//   PUT /comercios/:id       → actualizar
//   DELETE /comercios/:id    → eliminar
app.use("/comercios", comercioRoutes);

// MANEJO DE ERRORES (ORDEN IMPORTANTE) 

// Middleware para rutas no encontradas (404)
// DEBE ir DESPUÉS de todas las rutas definidas
// Captura cualquier petición que no coincida con las rutas anteriores
// Si una petición llega hasta aquí, significa que la ruta no existe
app.use(notFound);

// Middleware manejador de errores global
// DEBE ser el ÚLTIMO middleware en la cadena
// Captura cualquier error pasado con next(error) desde controladores/servicios
// Tiene 4 parámetros (err, req, res, next) - Express lo reconoce automáticamente
app.use(errorHandler);

// INICIAR EL SERVIDOR

// Inicia el servidor HTTP en el puerto especificado
// El puerto viene del archivo .env o usa el valor por defecto (ej: 3000)
app.listen(PORT, () => {
  // Callback que se ejecuta cuando el servidor está listo
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});