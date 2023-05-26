import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Render,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import { Members } from './entities/members.entity';
import { Payments } from './entities/payments.entity';
import { faker } from '@faker-js/faker';
import MemberDto from './dtos/member.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Post('/seed')
  async seed() {
    const payment = new Payments();

    for (let i = 1; i < 16; i++) {
      payment.amount = 5000;
      payment.paid_at = faker.date.future();
      payment.member_id = 1;
      await this.dataSource.getRepository(Payments).save(payment);
    }
  }

  @Get('/api/members')
  async getMembers() {
    return await this.dataSource.getRepository(Members).find();
  }

  @Post('/api/members')
  async addMember(@Body() memberDto: MemberDto) {
    const member = new Members();
    member.birth_date = memberDto.birth_date.toString();
    member.gender = memberDto.gender;
    member.name = memberDto.name;
    member.createdAt = new Date();

    return await this.dataSource.getRepository(Members).save(member);
  }

  @Post('/api/members/:id/pay')
  async addPayment(@Param('id') memberId: number) {
    if (
      (await this.dataSource
        .getRepository(Members)
        .findOneBy({ id: memberId })) == null
    ) {
      throw new NotFoundException();
    }

    const newPayment = new Payments();
    newPayment.paid_at = new Date();
    newPayment.amount = 5000;
    newPayment.member_id = memberId;

    return await this.dataSource.getRepository(Payments).save(newPayment);
  }
}
