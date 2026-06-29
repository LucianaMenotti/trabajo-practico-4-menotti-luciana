import express from "express";
import sequelize from "./src/config/database.js";
import movieRoutes from "./src/routes/movie.routes.js";

const app = express();

app.use(express.json());

app.use("/api/movies", movieRoutes);

const PORT = 3000;

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log("Base de datos sincronizada");

    app.listen(PORT, () => {
      console.log("Servidor corriendo en http://localhost:" + PORT);
    });
  } catch (error) {
    console.log("Error al iniciar el servidor o conectar la base de datos:", error);
  }
};

startServer();