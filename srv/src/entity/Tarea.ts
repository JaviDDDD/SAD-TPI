import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Tarea extends BaseEntity {
  @Column()
  nombre!: string;

  @Column({
    default: false
  })
  activa!: boolean;

  
  @Column({
    default: 0
  })
  actividad!: number;

  
  @Column({
    default: false
  })
  completada!: boolean;
}
