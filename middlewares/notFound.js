// Middleware para manejar rutas que no existen en la API
// Se ejecuta cuando ninguna ruta definida coincide con la petición

// Define el middleware para rutas no encontradas (404)
// A diferencia del errorHandler, este solo tiene 2 parámetros (req, res)
// No necesita 'next' porque no hay a dónde continuar
function notFound(req, res) {
  // Envía respuesta con código 404 (Not Found)
  // Indica que el recurso solicitado no existe en el servidor
  res.status(404).json({
    // Mensaje genérico indicando que la ruta no fue encontrada
    // No se usa req.url para no exponer detalles internos
    error: "Ruta no encontrada"
  });
  
}

// Exporta el middleware para usarlo en el archivo principal (app.js)
module.exports = notFound;

/*
Petición: GET /api/productos (ruta que NO existe)    
Express busca coincidencia en las rutas definidas
    
¿Coincide con /api/comercios?  NO
¿Coincide con /api/usuarios?  NO
    
Ninguna ruta coincidió    
Ejecuta el middleware notFound (porque está después de todas las rutas)    
Cliente recibe: 404 - { error: "Ruta no encontrada" }
*/