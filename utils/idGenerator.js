// Archivo para generar identificadores únicos
function generarId() {
  // Date.now() retorna el timestamp actual en milisegundos
  // desde el 1 de enero de 1970 (Unix epoch)
  // Ejemplo: 1743612345678 (número)
  
  // .toString() convierte ese número a string
  // Ejemplo: "1743612345678" (texto)
  
  // Se usa string en lugar de número para evitar problemas
  // con la precisión de JavaScript en números muy grandes
  return Date.now().toString();
}

// Exporta la función para que pueda ser utilizada en otros archivos
// CommonJS syntax (estándar en Node.js)
module.exports = { generarId };

/*
IMPORTANTE1
Ventajas	                    Desventajas
Siempre único (en milisegundos)	No es aleatorio (predecible)
Orden cronológico natural	    Colisiones posibles en sistemas muy rápidos
Fácil de implementar	        No es seguro para exposición pública
No requiere base de datos	    No garantiza unicidad en sistemas distribuidos
Bajo consumo de recursos	    Revela información de cuándo se creó

Cuándo usar este generador simple:

Proyectos pequeños o prototipos
APIs internas (no expuestas al público)
Donde el orden cronológico es importante
No hay alta concurrencia (muchas creaciones por segundo)

Cuándo NO usarlo:

IDs expuestos al cliente (URLs, respuestas API)
Sistemas con alta concurrencia
Múltiples servidores o microservicios
Requisitos de seguridad o imprevisibilidad

Este archivo representa una utilidad simple pero efectiva para proyectos pequeños,
siguiendo el principio DRY (Don't Repeat Yourself) al centralizar la generación de 
IDs en un solo lugar.

IMPORTANTE2
Si uso una base de datos real, NO necesitamos este generador de IDs.
La base de datos se encarga de generar IDs automáticamente.
*/