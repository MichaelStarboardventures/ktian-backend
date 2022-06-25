import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  VersionColumn,
} from 'typeorm';
import { MainPage } from '../dto';

import { Route as RouteDto } from '../dto';

@Entity()
export class Route {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  routes: string;

  @UpdateDateColumn()
  updateTime: Date;

  @CreateDateColumn()
  createTime: Date;

  @VersionColumn()
  version: number;

  @Column({
    default: false,
    type: Boolean,
  })
  isDelete: boolean;

  @Column({
    default: 0,
  })
  mainPage: MainPage;
}
