import { Router } from "express";
import type { Request, Response } from "express";

export class TareaController {
  router: Router;
  path: string;

  constructor() {
    this.path = "/tarea";
    this.router = Router();
    this.router.get("/", this.handleGetHome.bind(this));
  }

  private async handleGetHome(req: Request, res: Response) {
    res.json({ message: "test" });
  }
}