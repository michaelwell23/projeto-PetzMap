import {
  Entity,
  Column,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Image from './Image';

@Entity()
export default class Pets {
  [x: string]: any;
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  whatsapp: string;

  @Column('decimal', { precision: 10, scale: 2 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 2 })
  longitude: number;

  @Column()
  ad_title: string;

  @Column()
  species: string;

  @Column({ default: 'Não informar' })
  breed: string;

  @Column()
  sex: string;

  @Column({ default: 'Não informar' })
  castrated: string;

  @Column()
  color_animal: string;

  @Column()
  info_pet: string;

  @Column()
  info_donation: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Image, (image) => image.pet, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'pet_id' })
  images: Image[];
}
