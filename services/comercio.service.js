// Importa el modelo/constructor de Comercio desde el archivo de modelos
const { Comercio } = require("../models/Comercio");

// Importa el repositorio de comercios (capa de acceso a datos)
const repo = require("../repositories/comercio.repository");

// Función p/ generar IDs únicos ver explicacion en utils/idGenerators.js
function generarId() {
  return Date.now().toString();
}

// Servicio: Obtener todos los comercios
// Actúa como intermediario entre el controlador y el repositorio
async function obtenerComercios() {
  // Simplemente delega en el repositorio y retorna el resultado
  return await repo.getAll();
}

// Servicio: Obtener un comercio por su ID con validación de existencia
async function obtenerComercioPorId(id) {
  // Busca el comercio en el repositorio
  const comercio = await repo.getById(id);
  
  // Si no existe, lanza un error (será capturado por el controlador)
  if (!comercio) throw new Error("Comercio no encontrado");
  
  // Si existe, lo retorna
  return comercio;
}

// Servicio: Crear un nuevo comercio
async function crearComercio(data) {
  // Instancia un nuevo objeto Comercio (aplicando validaciones del modelo)
  // - id: generado automáticamente con timestamp
  // - ...data: propaga todas las propiedades recibidas (nombre, dirección, etc.)
  const nuevo = new Comercio({
    id: generarId(),      // Asigna ID único
    ...data               // Spread: copia todas las demás propiedades
  });

  // Guarda el nuevo comercio usando el repositorio y lo retorna
  return await repo.create(nuevo);
}

// Servicio: Actualizar un comercio existente
async function actualizarComercio(id, data) {
  // Intenta actualizar el comercio en el repositorio
  // El repositorio retorna null si no encuentra el ID
  const actualizado = await repo.update(id, data);
  
  // Si no se pudo actualizar (comercio no existe), lanza error
  if (!actualizado) throw new Error("Comercio no encontrado");
  
  // Si se actualizó correctamente, retorna el objeto actualizado
  return actualizado;
}

// Servicio: Eliminar un comercio
async function eliminarComercio(id) {
  // Delega la eliminación en el repositorio
  // El repositorio retorna true si se eliminó (o intentó eliminar)
  return await repo.remove(id);
}

// Exporta todas las funciones del servicio
// Estas serán usadas por los controladores o rutas
module.exports = {
  obtenerComercios,      // GET /comercios
  obtenerComercioPorId,  // GET /comercios/:id
  crearComercio,         // POST /comercios
  actualizarComercio,    // PUT /comercios/:id
  eliminarComercio       // DELETE /comercios/:id
};

/*
Responsabilidades de esta capa:
Generar IDs automáticos para nuevos registros
Validar existencia antes de operaciones (lanzar errores si no existe)
Instanciar modelos con la estructura correcta
Orquestar las operaciones del repositorio
Manejar reglas de negocio 
Ventajas de esta separación:
El controlador no sabe cómo se guardan los datos
El repositorio no sabe las reglas de negocio
El servicio coordina todo y es fácil de probar
Se puede cambiar la fuente de datos (JSON → DB real) sin modificar los servicios
*/