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

    @Column({ default: "shares" })
    amountType: string;

    @Column({ nullable: true })
    price: number;

    @Column({ default: false })
    gtc: boolean;

    @Column({ nullable: true })
    expiration?: Date;

    @ManyToOne(() => User, user => user.trades)
    user: number;
}