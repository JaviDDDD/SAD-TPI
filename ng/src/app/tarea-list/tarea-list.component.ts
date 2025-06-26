import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Tarea, TareaService } from '../_services/tarea.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarea-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
  ],
  templateUrl: './tarea-list.component.html',
  styleUrl: './tarea-list.component.css',
})
export class TareaListComponent {
  pendientes: Tarea[] = [];
  activas: Tarea[] = [];
  completadas: Tarea[] = [];
  displayedColumns: string[] = ['nombre', 'createdAt', 'actividad', 'actions'];
  now: number;
  nombreTarea: string = '';

  constructor(private service: TareaService) {
    this.now = new Date().getTime();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.refreshTable();
    setInterval(() => {
      this.now = new Date().getTime();
    }, 1000);
  }

  refreshTable() {
    this.service.getTareas().subscribe({
      next: (response) => {
        console.log(response);
        const tareas: Tarea[] = (response as any).map((t: any) => ({
          ...t,
          createdAt: new Date(t.createdAt),
          updatedAt: new Date(t.updatedAt),
          deletedAt: t.deletedAt ? new Date(t.deletedAt) : null,
        }));
        this.pendientes = tareas.filter((v) => !v.activa && !v.completada);
        this.activas = tareas.filter((v) => v.activa && !v.completada);
        this.completadas = tareas.filter((v) => v.completada);
      },
      error: (error) => {
        alert('Error al obtener tareas');
        console.error(error);
      },
      complete: () => {},
    });
  }

  getActividad(tarea: Tarea) {
    return tarea.actividad + (this.now - tarea.updatedAt.getTime());
  }

  parseMs(ms: number): string {
    const totalSegundos = Math.floor(ms / 1000);
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(horas)}:${pad(minutos)}:${pad(segundos)}`;
  }

  toggleActiva(tarea: Tarea) {
    this.service.toggleActiva(tarea.id).subscribe({
      next: (response) => {
        this.refreshTable();
      },
      error: (error) => {
        alert('Error al cambiar la actividad de la tarea');
        console.error(error);
      },
      complete: () => {},
    });
  }

  setCompletada(tarea: Tarea) {
    if (confirm('¿Estás seguro que querés completar esta tarea?'))
      this.service.setCompletada(tarea.id).subscribe({
        next: (response) => {
          this.refreshTable();
        },
        error: (error) => {
          alert('Error al cambiar la actividad de la tarea');
          console.error(error);
        },
        complete: () => {},
      });
  }

  deleteTarea(tarea: Tarea) {
    if (confirm('¿Estás seguro querés eliminar esta tarea?'))
      this.service.deleteTarea(tarea.id).subscribe({
        next: (response) => {
          this.refreshTable();
        },
        error: (error) => {
          alert('Error al cambiar la actividad de la tarea');
          console.error(error);
        },
        complete: () => {},
      });
  }

  agregarTarea() {
    if (this.nombreTarea == '') {
      alert('Ingrese un nombre para la tarea');
      return;
    }

    this.service.createTarea(this.nombreTarea).subscribe({
      next: (response) => {
        this.refreshTable();
        this.nombreTarea = '';
      },
      error: (error) => {
        alert('Error al crear la tarea');
        console.error(error);
      },
      complete: () => {},
    });
  }
}
