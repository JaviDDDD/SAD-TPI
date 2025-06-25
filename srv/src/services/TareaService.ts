import { Tarea } from "../entity/Tarea";

export class TareaService {
  async createTarea(nombre: string) {
    const tarea = Tarea.create({
      nombre: nombre,
      completada: false,
    });

    return Tarea.save(tarea);
  }

  async getTareas() {
    return Tarea.find();
  }

  async getById(id: string) {
    return Tarea.findOne({ where: { id: id } });
  }

  async toggleCompletada(tarea: Tarea) {
    tarea.completada = !tarea.completada;
    return Tarea.save(tarea);
  }

  async deleteById(id: string) {
    return Tarea.delete(id);
  }
}
