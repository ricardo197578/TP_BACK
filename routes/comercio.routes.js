const express = require("express");

const controller = require("../controllers/comercio.web.controller");

const router = express.Router();

router.get("/", controller.list);
router.get("/nuevo", controller.formCreate);
router.post("/", controller.create);
router.get("/:id", controller.detail);
router.get("/:id/editar", controller.formEdit);
router.post("/:id/editar", controller.update);
router.post("/:id/eliminar", controller.remove);

module.exports = router;
