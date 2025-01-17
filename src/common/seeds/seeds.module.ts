import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { SeedsController } from './seeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModulesModule } from '@modules/modules.module';
import { AccessesModule } from '@accesses/accesses.module';
import { UsersModule } from '@users/users.module';
import { AuthModule } from '@auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MembersModule } from '@members/members.module';
import { EventsModule } from 'src/events/events.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ReportsModule } from 'src/reports/reports.module';
import { GroupsModule } from '@groups/groups.module';
import { GroupTypesModule } from '@groupTypes/group-types.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod',
      extra: {
        ssl:
          process.env.STAGE === 'prod' ? { rejectUnauthorized: false } : null,
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: false,
      migrations: [__dirname + '/src/common/migrations/*{.ts,.js}'],
    }),
    ScheduleModule.forRoot(),
    GroupTypesModule,
    GroupsModule,
    ReportsModule,
    EventsModule,
    MembersModule,
    ModulesModule,
    UsersModule,
    AccessesModule,
    AuthModule,
  ],
  controllers: [SeedsController],
  providers: [SeedsService],
})
export class SeedsModule {}
