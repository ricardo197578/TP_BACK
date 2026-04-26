const comercioService = require("../services/comercio.service");
const tiendaService = require("../services/tienda.service");

async function getAll(req, res, next) {
  try {
    const [tiendas, comercios] = await Promise.all([
      tiendaService.obtenerTiendas(),
      comercioService.obtenerComercios()
    ]);

    const comerciosPorId = new Map(comercios.map((comercio) => [comercio.id, comercio.nombre]));
    const tiendasConComercio = tiendas.map((tienda) => ({
      ...tienda,
      comercioNombre: comerciosPorId.get(tienda.comercioId) || "-"
    }));

    res.render("tiendas/list", { tiendas: tiendasConComercio });
  } catch (error) {
    next(error);
  }
}

async function getForm(req, res, next) {
  try {
    const comercios = await comercioService.obtenerComercios();
    res.render("tiendas/form", {
      tienda: null,
      comercios,
      action: "/tiendas",
      submitLabel: "Crear"
    });
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const tienda = await tiendaService.obtenerTiendaPorId(req.params.id);
    const comercio = await comercioService.obtenerComercioPorId(tienda.comercioId);

    res.render("tiendas/detail", {
      tienda,
      comercio
    });
  } catch (error) {
    if (error.message === "Tienda no encontrada" || error.message === "Comercio no encontrado") {
      error.status = 404;
    }

    next(error);
  }
}

async function getEditForm(req, res, next) {
  try {
    const [tienda, comercios] = await Promise.all([
      tiendaService.obtenerTiendaPorId(req.params.id),
      comercioService.obtenerComercios()
    ]);

    res.render("tiendas/form", {
      tienda,
      comercios,
      action: `/tiendas/${tienda.id}/editar`,
      submitLabel: "Guardar cambios"
    });
  } catch (error) {
    if (error.message === "Tienda no encontrada") {
      error.status = 404;
    }

    next(error);
  }
}

async function create(req, res, next) {
  try {
    const payload = {
      nombre: req.body.nombre,
      comercioId: req.body.comercioId,
      activo: req.body.activo !== "false"
    };

    await tiendaService.crearTienda(payload);
    res.redirect("/tiendas");
  } catch (error) {
    error.status = 400;
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const payload = {
      nombre: req.body.nombre,
      comercioId: req.body.comercioId,
      activo: req.body.activo !== "false"
    };

    await tiendaService.actualizarTienda(req.params.id, payload);
    res.redirect("/tiendas");
  } catch (error) {
    if (error.message === "Tienda no encontrada" || error.message === "Comercio no encontrado") {
      error.status = 404;
    } else {
      error.status = 400;
    }

    next(error);
  }
}

async function remove(req, res, next) {
  try {
    await tiendaService.eliminarTienda(req.params.id);
    res.redirect("/tiendas");
  } catch (error) {
    error.status = error.message === "Tienda no encontrada" ? 404 : 500;
    next(error);
  }
}

module.exports = {
  getAll,
  getForm,
  getById,
  getEditForm,
  create,
  update,
  remove
};
