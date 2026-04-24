const express = require("express");
const router = express.Router();

const controller = require("../controllers/tienda.controller");

router.get("/", controller.getAll);
router.get("/nueva", controller.getForm);
router.post("/", controller.create);

module.exports = router;