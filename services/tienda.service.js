const { Tienda } = require("../models/Tienda");
const { generarId } = require("../utils/idGenerator");
const tiendaRepo = require("../repositories/tienda.repository");
const comercioRepo = require("../repositories/comercio.repository");

async function obtenerTiendas() {
  return await tiendaRepo.getAll();
}

async function obtenerTiendaPorId(id) {
  const tienda = await tiendaRepo.getById(id);

  if (!tienda) {
    throw new Error("Tienda no encontrada");
  }

  return tienda;
}

async function crearTienda(data) {
  const comercio = await comercioRepo.getById(data.comercioId);

  if (!comercio) {
    throw new Error("Comercio no encontrado");
  }

  const nueva = new Tienda({
    id: generarId(),
    nombre: data.nombre,
    comercioId: data.comercioId,
    activo: data.activo
  });

  return await tiendaRepo.create(nueva);
}

async function actualizarTienda(id, data) {
  if (data.comercioId) {
    const comercio = await comercioRepo.getById(data.comercioId);

    if (!comercio) {
      throw new Error("Comercio no encontrado");
    }
  }

  const actualizada = await tiendaRepo.update(id, data);

  if (!actualizada) {
    throw new Error("Tienda no encontrada");
  }

  return actualizada;
}

async function eliminarTienda(id) {
  const ok = await tiendaRepo.remove(id);

  if (!ok) {
    throw new Error("Tienda no encontrada");
  }

  return true;
}

module.exports = {
  obtenerTiendas,
  obtenerTiendaPorId,
  crearTienda,
  actualizarTienda,
  eliminarTienda
};
