import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';

import User from './User';

@Entity('socials')
class Social {
  @PrimaryGeneratedColumn('uuid')
  id_social: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  telegram: string;

  @Column()
  facebook: string;

  @Column()
  twitter: string;

  @Column()
  twitch: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Social;
