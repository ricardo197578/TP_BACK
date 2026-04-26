const service = require("../services/comercio.service");

async function list(req, res, next) {
  try {
    const comercios = await service.obtenerComercios();
    res.render("comercios/list", { comercios });
  } catch (error) {
    next(error);
  }
}

function formCreate(req, res) {
  res.render("comercios/form", {
    comercio: null,
    action: "/comercios",
    submitLabel: "Crear"
  });
}

async function detail(req, res, next) {
  try {
    const comercio = await service.obtenerComercioPorId(req.params.id);
    res.render("comercios/detail", { comercio });
  } catch (error) {
    error.status = error.message === "Comercio no encontrado" ? 404 : 500;
    next(error);
  }
}

async function formEdit(req, res, next) {
  try {
    const comercio = await service.obtenerComercioPorId(req.params.id);
    res.render("comercios/form", {
      comercio,
      action: `/comercios/${comercio.id}/editar`,
      submitLabel: "Guardar cambios"
    });
  } catch (error) {
    error.status = error.message === "Comercio no encontrado" ? 404 : 500;
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const payload = {
      nombre: req.body.nombre,
      cuit: req.body.cuit,
      email: req.body.email,
      activo: req.body.activo !== "false"
    };

    await service.crearComercio(payload);
    res.redirect("/comercios");
  } catch (error) {
    error.status = 400;
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const payload = {
      nombre: req.body.nombre,
      cuit: req.body.cuit,
      email: req.body.email,
      activo: req.body.activo !== "false"
    };

    await service.actualizarComercio(req.params.id, payload);
    res.redirect("/comercios");
  } catch (error) {
    if (error.message === "Comercio no encontrado") {
      error.status = 404;
    } else {
      error.status = 400;
    }

    next(error);
  }
}

async function remove(req, res, next) {
  try {
    await service.eliminarComercio(req.params.id);
    res.redirect("/comercios");
  } catch (error) {
    error.status = error.message === "Comercio no encontrado" ? 404 : 500;
    next(error);
  }
}

module.exports = {
  list,
  formCreate,
  detail,
  formEdit,
  create,
  update,
  remove
};
