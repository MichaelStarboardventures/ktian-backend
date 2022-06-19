import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Api {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  url: string;

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
  custom: 0 | 1;

  @Column('simple-array')
  components: string[];
}
