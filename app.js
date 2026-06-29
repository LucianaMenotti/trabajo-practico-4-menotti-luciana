import express from "express";
import sequelize from "./src/config/database.js";

const app = express();

app.use(express.json());

const PORT = 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexion a la base de datos exitosa.");
    
    app.listen(PORT, () => {
      console.log("Servidor corriendo en http://localhost:" + PORT);
    });
  } catch (error) {
    console.log("Error al conectar a la base de datos:", error);
  }
};

startServer();