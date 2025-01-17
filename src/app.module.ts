import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModulesModule } from '@modules/modules.module';
import { UsersModule } from '@users/users.module';
import { AuthModule } from '@auth/auth.module';
import { AccessesModule } from './accesses/accesses.module';
import { MembersModule } from './members/members.module';
import { EventsModule } from './events/events.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ReportsModule } from './reports/reports.module';
import { GroupsModule } from './groups/groups.module';
import { MemberStatusModule } from './member-status/member-status.module';
import { GroupTypesModule } from './group-types/group-types.module';

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
    ModulesModule,
    UsersModule,
    AuthModule,
    AccessesModule,
    MembersModule,
    EventsModule,
    ReportsModule,
    GroupsModule,
    MemberStatusModule,
    GroupTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
