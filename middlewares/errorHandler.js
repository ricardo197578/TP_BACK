// Middleware especializado para manejar errores en Express
// Se define con 4 parámetros (err, req, res, next) - Express lo reconoce automáticamente

// Los 4 parámetros son OBLIGATORIOS para que Express lo identifique como error handler
// Orden de parámetros: (error, request, response, next)
function errorHandler(err, req, res, next) {
  // Registra el error en la consola del servidor para debugging
  // Muestra el stack trace completo (archivo, línea, etc.)
  // Ejemplo en consola: "Error: Comercio no encontrado at getById (...)"
  console.error(err);

  // Envía respuesta al cliente con código de estado HTTP
  // Si el error tiene propiedad 'status', la usa (ej: 404, 400)
  // Si no, usa 500 (Error interno del servidor) por defecto
  res.status(err.status || 500).json({
    // Si el error tiene mensaje, lo envía; si no, mensaje genérico
    error: err.message || "Error interno"
  });
  
  // Nota: No se llama a next() porque este middleware es el último
  // en la cadena y ya envió la respuesta
}

// Exporta el middleware para usarlo en el archivo principal (app.js)
module.exports = errorHandler;

/*
¿Qué hace este middleware?

Captura y maneja todos los errores que ocurren en la aplicación, 
evitando que el servidor se caiga y devolviendo respuestas amigables al cliente.
*/