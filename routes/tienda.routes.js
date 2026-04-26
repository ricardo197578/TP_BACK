const express = require("express");
const controller = require("../controllers/tienda.controller");

const router = express.Router();

router.get("/", controller.getAll);
router.get("/nueva", controller.getForm);
router.post("/", controller.create);
router.get("/:id", controller.getById);
router.get("/:id/editar", controller.getEditForm);
router.post("/:id/editar", controller.update);
router.post("/:id/eliminar", controller.remove);

module.exports = router;
