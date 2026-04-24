const express = require("express");
const path = require("path");

const app = express();
const comercioWebRoutes = require("./routes/comercio.routes");
const comercioApiRoutes = require("./routes/comercio.api.routes");
const tiendaWebRoutes = require("./routes/tienda.routes");
const tiendaApiRoutes = require("./routes/tienda.api.routes");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const { PORT } = require("./config/env");

// Ajuste sobre aporte de la rama de prueba: separamos API y vistas para mantener MVC.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/css", express.static(path.join(__dirname, "css")));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/comercios", comercioWebRoutes);
app.use("/tiendas", tiendaWebRoutes);

//dejo solo la rutas de Leonel
//app.use("/api/comercios", comercioApiRoutes);
//app.use("/api/tiendas", tiendaApiRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
