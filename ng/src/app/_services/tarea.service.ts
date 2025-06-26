import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  protected _url: string = environment.apiUrl;
  protected _path: string = '/tarea';

  public get url(): string {
    return this._url + this._path;
  }

  constructor(private http: HttpClient) {}

  getTareas() {
    return this.http.get(this.url);
  }

  createTarea(nombre: string) {
    return this.http.post(this.url, { nombre });
  }

  deleteTarea(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  setCompletada(id: string) {
    return this.http.patch(`${this.url}/completada/${id}`, {});
  }

  toggleActiva(id: string) {
    return this.http.patch(`${this.url}/activa/${id}`, {});
  }
}

export interface Tarea {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  version: number;
  nombre: string;
  completada: boolean;
  activa: boolean;
  actividad: number;
}
