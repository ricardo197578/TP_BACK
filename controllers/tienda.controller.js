const comercioService = require("../services/comercio.service");
const tiendaService = require("../services/tienda.service");

// Ajuste sobre aporte de la rama de prueba: este controlador queda para vistas Pug.
async function getAll(req, res, next) {
  try {
    const tiendas = await tiendaService.obtenerTiendas();
    res.render("tiendas/list", { tiendas });
  } catch (error) {
    next(error);
  }
}

async function getForm(req, res, next) {
  try {
    const comercios = await comercioService.obtenerComercios();
    res.render("tiendas/form", { comercios });
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const payload = {
      nombre: req.body.nombre,
      comercioId: req.body.comercioId
    };

    await tiendaService.crearTienda(payload);
    res.redirect("/tiendas");
  } catch (error) {
    error.status = 400;
    next(error);
  }
}

module.exports = {
  getAll,
  getForm,
  create
};
