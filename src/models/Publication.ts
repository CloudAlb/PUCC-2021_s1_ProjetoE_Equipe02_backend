import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Tournament from './Tournament';
import User from './User';

@Entity('publications')
class Publication {
  @PrimaryGeneratedColumn('uuid')
  id_publication: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Tournament, { eager: true })
  @JoinColumn({ name: 'tournament_id' })
  tournament: Tournament;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Publication;
