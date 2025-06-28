import "reflect-metadata";
import "dotenv/config";

import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./config/appDataSource";
import router from "./router";
import path from "path";
import client from "prom-client";

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

async function tryDBConnection(): Promise<void> {
  let intento = 0;
  while (intento < MAX_RETRIES) {
    try {
      await AppDataSource.initialize();
      console.log("Base de datos conectada.");
      return;
    } catch (error) {
      intento++;
      console.error(
        `Fallo al conectar a la base de datos (intento ${intento}/${MAX_RETRIES}).`
      );
      if (intento >= MAX_RETRIES) throw error;
      await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
    }
  }
}

(async () => {
  try {
    await tryDBConnection();

    const app = express();

    // App Angular
    app.use(express.static(path.join(__dirname, "../public")));

    // Middlewares
    app.use(bodyParser.json());

    // Rutas
    app.use("/", router);

    // Metricas Prometheus
    client.collectDefaultMetrics();

    // Endpoint de Metricas de prometheus
    app.get("/metrics", async (_req, res) => {
      res.set("Content-Type", client.register.contentType);
      res.end(await client.register.metrics());
    });

    // Endpoint para la app Angular
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.listen(process.env.NODE_PORT, () => {
      console.log("Servidor Iniciado en puerto: " + process.env.NODE_PORT);
      console.log("Entorno: " + process.env.NODE_ENV);
    });
  } catch (error) {
    console.error("Error en la inicialización:", error);
    process.exit(1);
  }
})();
