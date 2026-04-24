// Importa el servicio de comercios (capa de lógica de negocio)
// Este servicio contiene todas las operaciones CRUD con validaciones
const service = require("../services/comercio.service");

// Controlador: Obtener todos los comercios
// Maneja la petición GET a la ruta principal (ej: /comercios)
async function getAll(req, res) {
  try {
    // Llama al servicio para obtener todos los comercios
    const data = await service.obtenerComercios();
    
    // Responde con código 200 OK y envía los datos en formato JSON
    res.json(data);
  } catch (error) {
    // Si ocurre cualquier error inesperado (problemas de lectura, etc.)
    // Responde con código 500 (Error interno del servidor)
    res.status(500).json({ error: error.message });
  }
}

// Controlador: Obtener un comercio por su ID
// Maneja la petición GET a la ruta con parámetro (ej:comercios/123)
async function getById(req, res) {
  try {
    // Obtiene el ID de los parámetros de la URL (req.params.id)
    // Ej: comercios/456 → req.params.id = "456"
    const data = await service.obtenerComercioPorId(req.params.id);
    
    // Responde con código 200 OK y el comercio encontrado
    res.json(data);
  } catch (error) {
    // Si el servicio lanza error "Comercio no encontrado"
    // Responde con código 404 (No encontrado)
    res.status(404).json({ error: error.message });
  }
}

// Controlador: Crear un nuevo comercio
// Maneja la petición POST a la ruta principal (ej: comercios)
async function create(req, res) {
  try {
    // Obtiene los datos del cuerpo de la petición (req.body)
    // Ej: { nombre: "Tienda XYZ", direccion: "Calle 123" }
    const data = await service.crearComercio(req.body);
    
    // Responde con código 201 (Creado exitosamente)
    // Envía el comercio recién creado (con su ID generado)
    res.status(201).json(data);
  } catch (error) {
    // Si hay error de validación o datos incorrectos
    // Responde con código 400 (Solicitud incorrecta)
    res.status(400).json({ error: error.message });
  }
}
res.render("comercios/list", {
  comercios: []
});

// LISTAR
exports.getAll = (req, res) => {
  res.render("comercios/list", {
    comercios: db.comercios
  });
};

// FORM
exports.getForm = (req, res) => {
  res.render("comercios/form");
};

// CREAR
exports.create = (req, res) => {
  const { nombre, email } = req.body;

  const nuevo = {
    id: db.comercios.length + 1,
    nombre,
    email
  };

  db.comercios.push(nuevo);

  res.redirect("/comercios");
};



// Controlador: Actualizar un comercio existente
// Maneja la petición PUT a la ruta con parámetro (ej: /comercios/123)
async function update(req, res) {
  try {
    // Pasa el ID de la URL y los datos de actualización del body
    const data = await service.actualizarComercio(req.params.id, req.body);
    
    // Responde con código 200 OK y el comercio actualizado
    res.json(data);
  } catch (error) {
    // Si el comercio no existe (servicio lanza "Comercio no encontrado")
    // Responde con código 404 (No encontrado)
    res.status(404).json({ error: error.message });
  }
}

// Controlador: Eliminar un comercio
// Maneja la petición DELETE a la ruta con parámetro (ej: comercios/123)
async function remove(req, res) {
  try {
    // Llama al servicio para eliminar el comercio por ID
    await service.eliminarComercio(req.params.id);
    
    // Responde con código 200 OK y un mensaje de éxito
    // Nota: También podría usarse 204 (Sin contenido) pero aquí envían mensaje
    res.json({ mensaje: "Eliminado correctamente" });
  } catch (error) {
    // Si hay error durante la eliminación (problemas de escritura, etc.)
    // Responde con código 500 (Error interno del servidor)
    res.status(500).json({ error: error.message });
  }
}

// Exporta todas las funciones del controlador
// Estas serán usadas por el enrutador (router) para asociar cada función a una ruta HTTP
module.exports = {
  getAll,    // GET    /comercios
  getById,   // GET    /comercios/:id
  create,    // POST   /comercios
  update,    // PUT    /comercios/:id
  remove     // DELETE /comercios/:id
};

/*
Responsabilidades de esta capa:
Recibir peticiones HTTP (req: request, res: response)
Extraer datos de la URL (params), query string, o body
Llamar al servicio correspondiente
Manejar errores y enviar códigos HTTP apropiados
Formatear respuestas en JSON
Códigos de estado HTTP utilizados:
200 OK: Éxito en GET, PUT, DELETE
201 Created: Éxito en POST (recurso creado)
400 Bad Request: Datos inválidos en POST
404 Not Found: Recurso no encontrado en GET/PUT
500 Internal Server Error: Error del servidor
*/