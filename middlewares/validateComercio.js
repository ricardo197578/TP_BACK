// Define un middleware para validar los datos de un comercio
// Este middleware se ejecutará antes de llegar al controlador de creación/actualización
function validarComercio(req, res, next) {
  // Extrae los campos necesarios del cuerpo de la petición (req.body)
  // Destructuring: obtiene nombre, cuit y email del objeto req.body
  const { nombre, cuit, email } = req.body;

  // VALIDACIÓN 1: Verificar que el nombre existe
  if (!nombre) {
    // Si no hay nombre, responde con código 400 (Bad Request)
    // IMPORTANTE: Se usa 'return' para detener la ejecución y no llamar a next()
    return res.status(400).json({ error: "Nombre obligatorio" });
  }

  // VALIDACIÓN 2: Verificar que el CUIT sea válido
  // Condición: si no existe CUIT O no cumple con el patrón de 11 dígitos
  if (!cuit || !/^\d{11}$/.test(cuit)) {
    // /^\d{11}$/ es una expresión regular que significa:
    // ^ = inicio del string
    // \d = dígito (0-9)
    // {11} = exactamente 11 veces
    // $ = fin del string
    return res.status(400).json({ error: "CUIT inválido" });
  }

  // VALIDACIÓN 3: Verificar que el email sea válido
  // Condición: si no existe email O no contiene el carácter '@'
  if (!email || !email.includes("@")) {
    // Validación básica de email se tiene que escalar a una mas robusta
    return res.status(400).json({ error: "Email inválido" });
  }

  // Si las validaciones pasaron exitosamente:
  // next() es una función que pasa el control al siguiente middleware o al controller
  // Sin next(), la petición se quedaría "colgada" sin respuesta
  next(); 
}

// Exporta el middleware para que pueda ser usado en las rutas
module.exports = { validarComercio };

/*
¿Qué es un Middleware en Express?
Un middleware es una función que tiene acceso al objeto de solicitud (req), 
al objeto de respuesta (res), y a la siguiente función middleware en el ciclo 
de solicitud-respuesta (next).

REQUEST → MIDDLEWARE → CONTROLLER → RESPONSE

Características importantes:
Intercepta la petición antes de que llegue al controlador
Puede terminar la petición enviando una respuesta directamente (como en los errores)
Debe llamar a next() si todo está bien para continuar con el flujo normal
El orden importa - los middlewares se ejecutan en el orden en que se declaran

Ventajas de usar middlewares para validación:
Separación de responsabilidades: La validación está separada del controlador
Reutilización: El mismo middleware se puede usar en POST y PUT
Legibilidad: El código es más limpio y fácil de mantener
Composición: Se pueden encadenar múltiples middlewares

*/