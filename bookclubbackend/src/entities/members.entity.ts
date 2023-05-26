import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Members {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('enum', { name: 'gender', nullable: true, enum: ['M', 'F'] })
  gender: 'M' | 'F' | null;

  @Column('date')
  birth_date: string;

  @Column()
  banned: number;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
