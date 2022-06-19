import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApisModule } from '../apis/apis.module';
import { PagesModule } from '../pages/pages.module';
import { ComponentsModule } from '../components/components.module';

const env = process.env.NODE_ENV;

const mysqlConfig = {
  development: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '00000000',
    database: 'mysql',
  },
  production: {
    host: 'rm-uf61car7971147gkiao.mysql.rds.aliyuncs.com',
    port: 3306,
    username: 'pangu',
    password: 'Hcl87523615',
    database: 'pangu',
  },
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      ...mysqlConfig[env],
      entities: ['dist/**/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ApisModule,
    PagesModule,
    ComponentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
