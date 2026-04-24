const service = require("../services/comercio.service");

// Ajuste sobre aporte de la rama de prueba: controlador web para Pug.
async function list(req, res, next) {
  try {
    const comercios = await service.obtenerComercios();
    res.render("comercios/list", { comercios });
  } catch (error) {
    next(error);
  }
}

function form(req, res) {
  res.render("comercios/form");
}

async function create(req, res, next) {
  try {
    await service.crearComercio(req.body);
    res.redirect("/comercios");
  } catch (error) {
    error.status = 400;
    next(error);
  }
}

module.exports = {
  list,
  form,
  create
};
