import { Tarea } from "../entity/Tarea";

export class TareaService {
  async createTarea(nombre: string) {
    const tarea = Tarea.create({
      nombre: nombre,
    });

    return Tarea.save(tarea);
  }

  async getTareas() {
    return Tarea.find();
  }

  async getById(id: string) {
    return Tarea.findOne({ where: { id: id } });
  }

  async toggleActiva(tarea: Tarea) {
    if (tarea.activa) {
      tarea.actividad += new Date().getTime() - tarea.updatedAt.getTime();
    }
    tarea.activa = !tarea.activa;
    return Tarea.save(tarea);
  }

  async setCompletada(tarea: Tarea) {
    if (tarea.activa) {
      tarea.actividad += new Date().getTime() - tarea.updatedAt.getTime();
    }
    tarea.completada = true;
    tarea.activa = false;
    return Tarea.save(tarea);
  }

  async deleteById(id: string) {
    return Tarea.delete(id);
  }
}
