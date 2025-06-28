import { TareaService } from '../services/TareaService';
import { Tarea } from '../entity/Tarea';

jest.mock('../entity/Tarea'); 

describe('TareaService', () => {
  const service = new TareaService();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('createTarea debe crear y guardar una tarea', async () => {
    const mockTarea = { nombre: 'Test tarea', save: jest.fn() };
    (Tarea.create as jest.Mock).mockReturnValue(mockTarea);
    (Tarea.save as jest.Mock).mockResolvedValue({ id: '1', nombre: 'Test tarea' });

    const result = await service.createTarea('Test tarea');

    expect(Tarea.create).toHaveBeenCalledWith({ nombre: 'Test tarea' });
    expect(Tarea.save).toHaveBeenCalledWith(mockTarea);
    expect(result).toEqual({ id: '1', nombre: 'Test tarea' });
  });

  it('getTareas debe retornar tareas', async () => {
    const tareas = [{ id: '1' }, { id: '2' }];
    (Tarea.find as jest.Mock).mockResolvedValue(tareas);

    const result = await service.getTareas();

    expect(Tarea.find).toHaveBeenCalled();
    expect(result).toBe(tareas);
  });

  it('getById debe buscar por id', async () => {
    const tarea = { id: '1', nombre: 'Test' };
    (Tarea.findOne as jest.Mock).mockResolvedValue(tarea);

    const result = await service.getById('1');

    expect(Tarea.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(result).toBe(tarea);
  });

  it('toggleActiva debe cambiar el estado activa y guardar', async () => {
    const tareaMock = {
      activa: true,
      actividad: 0,
      updatedAt: new Date(Date.now() - 1000),
    };
    (Tarea.save as jest.Mock).mockResolvedValue({ ...tareaMock, activa: false });

    const result = await service.toggleActiva(tareaMock as any);

    expect(result.activa).toBe(false);
    expect(Tarea.save).toHaveBeenCalledWith(expect.objectContaining({ activa: false }));
  });

  it('setCompletada debe completar y desactivar la tarea', async () => {
    const tareaMock = {
      activa: true,
      actividad: 0,
      completada: false,
      updatedAt: new Date(Date.now() - 1000),
    };
    (Tarea.save as jest.Mock).mockResolvedValue({ ...tareaMock, completada: true, activa: false });

    const result = await service.setCompletada(tareaMock as any);

    expect(result.completada).toBe(true);
    expect(result.activa).toBe(false);
    expect(Tarea.save).toHaveBeenCalledWith(expect.objectContaining({ completada: true }));
  });

  it('deleteById debe eliminar una tarea', async () => {
    (Tarea.delete as jest.Mock).mockResolvedValue({ affected: 1 });

    const result = await service.deleteById('123');

    expect(Tarea.delete).toHaveBeenCalledWith('123');
    expect(result).toEqual({ affected: 1 });
  });
});