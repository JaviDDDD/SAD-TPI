import { Router } from "express";
import type { Request, Response } from "express";
import { TareaService } from "../services/TareaService";
import { Tarea } from "../entity/Tarea";

export class TareaController {
  router: Router;
  path: string;
  tareaService: TareaService;

  constructor() {
    this.path = "/tarea";
    this.router = Router();
    this.tareaService = new TareaService();
    this.router.get("/", this.handleGet.bind(this));
    this.router.post("/", this.handlePost.bind(this));
    this.router.delete("/:id", this.handleDelete.bind(this));
    this.router.patch("/completada/:id", this.handlePatchCompletada.bind(this));
    this.router.patch("/activa/:id", this.handlePatchActiva.bind(this));
  }

  private async handleGet(req: Request, res: Response) {
    try {
      const tareas = await this.tareaService.getTareas();
      res.status(200).json(tareas);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }

  private async handlePost(req: Request, res: Response) {
    try {
      const nombre = req.body.nombre;
      if (!nombre) {
        res.status(400).send({ message: "El nombre es obligatorio" });
        return;
      }

      const tarea = await this.tareaService.createTarea(nombre);

      res.status(201).json(tarea);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }

  private async handleDelete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).send({ message: "La id es obligatoria" });
        return;
      }

      const tarea = await this.tareaService.getById(id);
      if (!tarea) {
        res.status(404).send({ message: "Tarea no encontrada" });
        return;
      }

      const deletedResult = await this.tareaService.deleteById(tarea.id);

      if (
        deletedResult &&
        deletedResult.affected &&
        deletedResult.affected > 0
      ) {
        res.status(200).json({ deleted: true });
      } else {
        res.status(204).json({ deleted: false });
      }
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }

  private async handlePatchCompletada(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).send({ message: "La id es obligatoria" });
        return;
      }

      let tarea = await this.tareaService.getById(id);
      if (!tarea) {
        res.status(404).send({ message: "Tarea no encontrada" });
        return;
      }

      tarea = await this.tareaService.setCompletada(tarea);
      res.status(200).json(tarea);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }

  private async handlePatchActiva(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).send({ message: "La id es obligatoria" });
        return;
      }

      let tarea = await this.tareaService.getById(id);
      if (!tarea) {
        res.status(404).send({ message: "Tarea no encontrada" });
        return;
      }

      tarea = await this.tareaService.toggleActiva(tarea);
      res.status(200).json(tarea);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }
}
