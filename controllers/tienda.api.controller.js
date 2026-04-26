const service = require("../services/tienda.service");

async function getAll(req, res, next) {
  try {
    const data = await service.obtenerTiendas();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const data = await service.obtenerTiendaPorId(req.params.id);
    res.json(data);
  } catch (error) {
    error.status = error.message === "Tienda no encontrada" ? 404 : 500;
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const data = await service.crearTienda(req.body);
    res.status(201).json(data);
  } catch (error) {
    error.status = error.message === "Comercio no encontrado" ? 404 : 400;
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const data = await service.actualizarTienda(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    if (error.message === "Tienda no encontrada" || error.message === "Comercio no encontrado") {
      error.status = 404;
    } else {
      error.status = 500;
    }

    next(error);
  }
}

async function remove(req, res, next) {
  try {
    await service.eliminarTienda(req.params.id);
    res.json({ mensaje: "Eliminado correctamente" });
  } catch (error) {
    error.status = error.message === "Tienda no encontrada" ? 404 : 500;
    next(error);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
