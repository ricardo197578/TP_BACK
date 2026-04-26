// Importa el módulo 'path' para trabajar con rutas de archivos de forma segura
const path = require("path");

// Importa las funciones para leer y escribir archivos desde el módulo handler
// (usa ruta relativa: sube un nivel con ../)
const { leerArchivo, escribirArchivo } = require("../utils/fileHandler");

// Define la ruta absoluta al archivo JSON de comercios
// __dirname: directorio actual donde está este archivo
// Se une con "../data/comercios.json" para ir a la carpeta data
const RUTA = path.join(__dirname, "../data/comercios.json");

// Obtener todos los comercios
async function getAll() {
  // Lee y retorna todo el contenido del archivo JSON
  return await leerArchivo(RUTA);
}

// Buscar un comercio por su ID
async function getById(id) {
  // Obtiene todos los comercios
  const comercios = await getAll();
  // Busca el primer comercio cuyo id coincida con el parámetro
  // Si no lo encuentra, retorna undefined
  return comercios.find(c => c.id === id);
}

// Crear un nuevo comercio
async function create(comercio) {
  // Obtiene la lista actual de comercios
  const comercios = await getAll();
  
  // Agrega el nuevo comercio al final del array
  comercios.push(comercio);
  
  // Guarda el array actualizado en el archivo
  await escribirArchivo(RUTA, comercios);
  
  // Retorna el comercio creado (útil para confirmación)
  return comercio;
}

// Actualizar un comercio existente
async function update(id, data) {
  // Obtiene todos los comercios
  const comercios = await getAll();
  
  // Busca el índice del comercio con el ID especificado
  const index = comercios.findIndex(c => c.id === id);

  // Si no existe (index = -1), retorna null indicando que no se encontró
  if (index === -1) return null;

  // Actualiza el comercio combinando:
  // - Los datos originales del comercio existente
  // - Los nuevos datos proporcionados (sobrescriben)
  // - Agrega un timestamp de actualización
  comercios[index] = {
    ...comercios[index],  // Spread: copia propiedades existentes
    ...data,              // Spread: sobrescribe con nuevos datos
    updatedAt: new Date() // Agrega fecha/hora de modificación
  };

  // Guarda el array modificado en el archivo
  await escribirArchivo(RUTA, comercios);
  
  // Retorna el comercio actualizado
  return comercios[index];
}

// Eliminar un comercio por ID
async function remove(id) {
  // Obtiene todos los comercios
  const comercios = await getAll();
  
  // Filtra el array, conservando solo los comercios con ID diferente
  // (esto elimina el que coincide con 'id')
  const filtrados = comercios.filter(c => c.id !== id);

  if (filtrados.length === comercios.length) {
    return false;
  }

  // Guarda el array filtrado (sin el comercio eliminado)
  await escribirArchivo(RUTA, filtrados);
  
  // Retorna true indicando que la operación fue exitosa
  return true;
}

// Exporta todas las funciones CRUD para ser usadas en otros módulos
module.exports = {
  getAll,    // Leer todos
  getById,   // Leer uno
  create,    // Crear
  update,    // Actualizar
  remove     // Eliminar (delete)
};

/*
Este módulo implementa un CRUD completo (Create, Read, Update, Delete)
para gestionar comercios usando un archivo JSON como base de datos:
getAll: lista todos los comercios
getById: busca un comercio específico
create: agrega un nuevo comercio
update: modifica un comercio existente (con timestamp automático)
remove: elimina un comercio
*/
