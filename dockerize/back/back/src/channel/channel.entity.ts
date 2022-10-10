import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ChannelType {
  PUBLIC = 'public',
  PRIVATE = 'private',
  PROTECTED = 'protected',
}

@Entity()
export class Channel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: ChannelType,
    default: ChannelType.PUBLIC,
  })
  type!: ChannelType;

  @Column()
  channelName!: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  ownerId!: string;

  @Column('text', { array: true })
  administratorsId!: string[];

  @Column('text', { array: true })
  usersId!: string[];

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
