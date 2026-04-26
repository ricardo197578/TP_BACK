const express = require("express");

const controller = require("../controllers/comercio.controller");
const { validarComercio } = require("../middlewares/validateComercio");

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validarComercio, controller.create);
router.put("/:id", validarComercio, controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
