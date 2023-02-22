import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Trades} from "./trades";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Trades, trades => trades.user)
    trades: Trades[];
}