const path = require("path");

const { leerArchivo, escribirArchivo } = require("../utils/fileHandler");

const RUTA = path.join(__dirname, "../data/tiendas.json");

async function getAll() {
  return await leerArchivo(RUTA);
}

async function getById(id) {
  const tiendas = await getAll();
  return tiendas.find((tienda) => tienda.id === id) || null;
}

async function create(tienda) {
  const tiendas = await getAll();
  tiendas.push(tienda);
  await escribirArchivo(RUTA, tiendas);
  return tienda;
}

async function update(id, data) {
  const tiendas = await getAll();
  const index = tiendas.findIndex((tienda) => tienda.id === id);

  if (index === -1) {
    return null;
  }

  tiendas[index] = {
    ...tiendas[index],
    ...data,
    updatedAt: new Date()
  };

  await escribirArchivo(RUTA, tiendas);
  return tiendas[index];
}

async function remove(id) {
  const tiendas = await getAll();
  const filtradas = tiendas.filter((tienda) => tienda.id !== id);

  if (filtradas.length === tiendas.length) {
    return false;
  }

  await escribirArchivo(RUTA, filtradas);
  return true;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
