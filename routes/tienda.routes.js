const express = require("express");
const controller = require("../controllers/tienda.controller");

const router = express.Router();

// Ajuste sobre aporte de la rama de prueba: rutas web de tiendas (Pug).
router.get("/", controller.getAll);
router.get("/nueva", controller.getForm);
router.post("/", controller.create);

module.exports = router;
