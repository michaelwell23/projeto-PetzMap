import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Pets {
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
}
