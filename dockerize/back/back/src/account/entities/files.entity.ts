import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class DatabaseFile {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  filename: string;

  @Column({
    type: 'bytea',
  })
  data: Uint8Array;

  @Column()
  isDefault: boolean;
}

export default DatabaseFile;
