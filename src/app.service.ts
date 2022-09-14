import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './test/contact.entity';
import { Employee } from './test/employee.entity';
import { Meeting } from './test/meeting.entity';
import { Task } from './test/task.entity';

@Injectable()
export class AppService {
  /*constructor(
    @InjectRepository(Contact) private contactRepo: Repository<Contact>,
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
  ){}

  async seed() {
    const ceo = this.employeeRepo.create({name: 'CEO'});
    await this.employeeRepo.save(ceo);
    
    const ceoContact = this.contactRepo.create({
      email: 'mail@mail.com', 
    });
    ceoContact.employee = ceo
    await this.contactRepo.save(ceoContact);

    const manager = this.employeeRepo.create({
      name: 'Nick',
      manager: ceo,
    });

    const task1 = this.taskRepo.create({name: 'rise Backend'});
    await this.taskRepo.save(task1);
    const task2 = this.taskRepo.create({name: 'do HWs'});
    await this.taskRepo.save(task2);

    manager.tasks = [task1, task2];

    const meeting1 = this.meetingRepo.create({zoomUrl: 'zoom.com'});
    meeting1.attendies = [ceo];
    await this.meetingRepo.save(meeting1);

    manager.meetings = [meeting1]
    await this.employeeRepo.save(manager);

  }*/
}
