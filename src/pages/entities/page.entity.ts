import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @Column('text')
  data: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @Column({
    default: 0,
  })
  mainPage: 0 | 1;

  @Column({
    default: false,
    type: Boolean,
  })
  isDelete: boolean;

  @VersionColumn()
  version: number;

  @Column('text')
  title: string;
}
