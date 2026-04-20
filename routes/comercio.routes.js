// Archivo de enrutamiento para los endpoints relacionados con comercios
// Define las URLs y qué controlador maneja cada una

const express = require("express");

// Crea un enrutador independiente
// Router() permite crear rutas modulares y montarlas en la app principal
// Es como un mini-app que solo maneja rutas específicas
const router = express.Router();

// Contiene la lógica de negocio para cada endpoint
const controller = require("../controllers/comercio.controller");


// Destructuring: extrae la función validarComercio del módulo
// Este middleware valida los datos antes de llegar al controlador
const { validarComercio } = require("../middlewares/validateComercio");

// Ruta para obtener TODOS los comercios GET /comercios
// No requiere middleware de validación (solo lectura)
// Controlador: getAll - retorna array de comercios
router.get("/", controller.getAll);

// Ruta para obtener UN comercio por su ID GET /comercios/:id
// :id es un parámetro variable en la URL (ej: /comercios/123)
// Controlador: getById - busca y retorna un comercio específico
router.get("/:id", controller.getById);

// Ruta para CREAR un nuevo comercio POST /comercios
// Body de la petición debe contener: nombre, cuit, email 
// Flujo de ejecución:
// 1. Primer middleware: validarComercio - valida los datos
// 2. Segundo: controller.create - crea el comercio si validación OK
// Si validarComercio encuentra error, responde con 400 y NO ejecuta create
router.post("/", validarComercio, controller.create);

// Ruta para ACTUALIZAR un comercio existente PUT /comercios/:id
// Body: datos a actualizar (parcial o completo)
// :id en URL identifica qué comercio modificar
// Flujo de ejecución:
// 1. Middleware validarComercio - valida los datos enviados
// 2. controller.update - actualiza el comercio si validación OK
router.put("/:id", validarComercio, controller.update);

// Ruta para ELIMINAR un comercio DELETE /comercios/:id
// :id en URL identifica qué comercio eliminar
// No necesita middleware de validación (solo requiere ID en URL)
router.delete("/:id", controller.remove);

// EXPORTAR Exporta el enrutador para ser usado en app.js
// app.js hará: app.use("/comercios", comercioRoutes)
module.exports = router;