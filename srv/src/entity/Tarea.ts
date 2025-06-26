import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Tarea extends BaseEntity{
  @Column()
  nombre!: string;

  @Column()
  completada!: boolean
}