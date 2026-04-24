function validarTienda(req, res, next) {
  const { nombre, comercioId } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "Nombre obligatorio" });
  }

  if (!comercioId) {
    return res.status(400).json({ error: "comercioId obligatorio" });
  }

  next();
}

module.exports = { validarTienda };
