import "reflect-metadata";
import "dotenv/config";

import express from "express";
import bodyParser from "body-parser";

import router from "./router"; // archivo donde exportás los controladores registrados
import { AppDataSource } from "./config/appDataSource";

(async () => {
  try {
    await AppDataSource.initialize();
    console.log("Base de datos conectada.");

    const app = express();

    // Middlewares
    app.use(bodyParser.json());

    // Rutas
    app.use("/", router);

    app.listen(process.env.NODE_PORT, () => {
      console.log("Servidor Iniciado en puerto: " + process.env.NODE_PORT);
      console.log("Entorno: " + process.env.NODE_ENV);
    });
  } catch (error) {
    console.error("Error en la inicialización:", error);
    process.exit(1);
  }
})();