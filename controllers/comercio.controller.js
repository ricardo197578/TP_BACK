/*const service = require("../services/comercio.service");

// Ajuste sobre aporte de la rama de prueba: este controlador queda solo para API JSON.
async function getAll(req, res, next) {
  try {
    const data = await service.obtenerComercios();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const data = await service.obtenerComercioPorId(req.params.id);
    res.json(data);
  } catch (error) {
    error.status = error.message === "Comercio no encontrado" ? 404 : 500;
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const data = await service.crearComercio(req.body);
    res.status(201).json(data);
  } catch (error) {
    error.status = 400;
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const data = await service.actualizarComercio(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    error.status = error.message === "Comercio no encontrado" ? 404 : 500;
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    await service.eliminarComercio(req.params.id);
    res.json({ mensaje: "Eliminado correctamente" });
  } catch (error) {
    error.status = 500;
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
*/