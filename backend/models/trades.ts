import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from "./user";
@Entity()
export class Trades {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    side: string;

    @Column()
    amount: number;

    @Column()
    price: number;

    @Column()
    GTC: boolean;

    @Column()
    expiration: Date;

    @ManyToOne(() => User, user => user.trades)
    user: number;
}