import express from "express";

const app = express();

app.use(express.json());

const PORT = 3000;

const startServer = async () => {
  try {
    app.listen(PORT, function() {
      console.log("Servidor corriendo en http://localhost:" + PORT);
    });
  } catch (error) {
    console.log("Error al iniciar el servidor:", error);
  }
};

startServer();