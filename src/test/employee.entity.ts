import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Contact } from "./contact.entity";
import { Meeting } from "./meeting.entity";
import { Task } from "./task.entity";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Meeting, meeting => meeting.attendies)
    @JoinTable()
    meetings: Meeting[]

    @ManyToOne(() => Employee, employee => employee.directReports, {onDelete: 'SET NULL'})
    manager: Employee;

    @OneToMany(() => Employee, employee => employee.manager)
    directReports: Employee[]

    @OneToOne(() => Contact, contact => contact.employee)
    contact: Contact;

    @OneToMany(() => Task, task => task.employee)
    tasks: Task[];
}