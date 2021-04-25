import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  OneToOne,
} from 'typeorm';

import User from './User';
import Camp from './Tournament';

@Entity('publications')
class Publicacao {
  @PrimaryGeneratedColumn('uuid')
  id_pub: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Camp)
  @JoinColumn({ name: 'id_camp' })
  id_camp: string;

  // @Column()
  // publicacao: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Publicacao;
