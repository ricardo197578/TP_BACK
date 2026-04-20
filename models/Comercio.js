//Clase Comercio
class Comercio{
    constructor({id,nombre,cuit,email,activo=true}){
        this.id = id;
        this.nombre = nombre;
        this.cuit = cuit;
        this.email = email;
        this.activo = activo;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

module.exports = { Comercio };