// Importa el módulo 'fs' (file system) y usa su versión de Promesas
// para poder usar async/await en lugar de callbacks
const fs = require("fs").promises;

// Función asíncrona que lee un archivo JSON desde una ruta específica
async function leerArchivo(ruta) {
  try {
    // Intenta leer el archivo de forma asíncrona en formato UTF-8
    const data = await fs.readFile(ruta, "utf-8");
    
    // Parsea el contenido del archivo como JSON
    // Si el archivo está vacío (data es string vacío), usa un array vacío como valor por defecto
    return JSON.parse(data || "[]");
  } catch (error) {
    // Si ocurre error (archivo no existe, JSON inválido, etc.)
    // retorna array vacío para evitar que el programa se rompa
    return [];
  }
}

// Función asíncrona que escribe datos en un archivo JSON
async function escribirArchivo(ruta, data) {
  // Convierte 'data' a string JSON con formato legible (indentación de 2 espacios)
  // Sobrescribe el archivo en la ruta especificada
  await fs.writeFile(ruta, JSON.stringify(data, null, 2));
}

// Exporta las funciones para que puedan ser usadas en otros archivos del proyecto
module.exports = { leerArchivo, escribirArchivo };
/*
Resumen funcional:
Este módulo proporciona dos utilidades para trabajar con archivos JSON de forma asíncrona y segura:
leerArchivo: lee y parsea un JSON, devolviendo un array vacío si falla
escribirArchivo: escribe datos en formato JSON con formato bonito
 */

