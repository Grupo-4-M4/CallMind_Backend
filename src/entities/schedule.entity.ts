import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Patient } from "./patient.entity";
import { Psychologist } from "./psychologist.entity";

@Entity("schedules")
export class Schedule {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @Column({ default: true })
  available: boolean;

  @Column({ nullable: true })
  link: string;

  @ManyToOne(() => Patient, (patient) => patient.schedules, { eager: true })
  patient: Patient;

  @ManyToOne(() => Psychologist, (psychologist) => psychologist.schedules)
  psychologist: Psychologist;
}
