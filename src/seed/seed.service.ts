import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { ProfesionalService } from 'src/profesional/profesional.service';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(
    private readonly profesionalService: ProfesionalService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async runSeed() {

    await this.deleteTables();
    const adminUser = await this.insertUsers();

    await this.insertNewProfesionals(adminUser);

    return 'SEED EXECUTED';
  }

  private async deleteTables() {

    await this.profesionalService.deleteAllProfesionals();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute()

  }

  private async insertUsers() {

    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach(user => {
      users.push(this.userRepository.create(user))
    });

    const dbUsers = await this.userRepository.save(seedUsers)

    return dbUsers[0];
  }


  private async insertNewProfesionals(user: User) {
    await this.profesionalService.deleteAllProfesionals();

    const profesionals = initialData.profesional;

    const insertPromises = [];

    profesionals.forEach(profesional => {
      insertPromises.push(this.profesionalService.create(profesional, user));
    });

    await Promise.all(insertPromises);


    return true;
  }
}
