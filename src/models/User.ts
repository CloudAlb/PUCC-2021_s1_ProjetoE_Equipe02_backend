import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id_user: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  birth_date: Date;

  @Column()
  password: string;

  @Column()
  avatar_image: string;

  @Column()
  background_image: string;

  @Column()
  bio: string;

  @Column()
  level: string;

  @Column()
  coins: string;

  @Column()
  friends: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
