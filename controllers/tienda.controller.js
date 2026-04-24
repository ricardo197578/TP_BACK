const db = require("../data/db");

// LISTAR
exports.getAll = (req, res) => {
  res.render("tiendas/list", {
    tiendas: db.tiendas
  });
};

// FORM
exports.getForm = (req, res) => {
  res.render("tiendas/form", {
    comercios: db.comercios
  });
};

// CREAR
exports.create = (req, res) => {
  const { nombre, comercio_id } = req.body;

  const nueva = {
    id: db.tiendas.length + 1,
    nombre,
    comercio_id
  };

  db.tiendas.push(nueva);

  res.redirect("/tiendas");
};