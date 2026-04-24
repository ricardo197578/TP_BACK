/*const express = require("express");

const controller = require("../controllers/tienda.api.controller");
const { validarTienda } = require("../middlewares/validateTienda");

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validarTienda, controller.create);
router.put("/:id", validarTienda, controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
*/