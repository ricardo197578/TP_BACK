class Tienda {
  constructor({ id, nombre, comercioId, activo = true, createdAt, updatedAt }) {
    this.id = id;
    this.nombre = nombre;
    this.comercioId = comercioId;
    this.activo = activo;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}

module.exports = { Tienda };
