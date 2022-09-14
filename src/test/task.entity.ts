import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @ManyToOne(() => Employee, employee => employee.tasks, {onDelete: 'SET NULL'})
    employee: Employee;
}