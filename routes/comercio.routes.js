const express = require("express");

const controller = require("../controllers/comercio.web.controller");

const router = express.Router();

// Ajuste sobre aporte de la rama de prueba: rutas web de comercios (Pug).
router.get("/", controller.list);
router.get("/nuevo", controller.form);
router.post("/", controller.create);

module.exports = router;
