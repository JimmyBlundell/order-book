import { createConnection, getConnection } from 'typeorm';
import { Trades } from './models/trades';
import { User } from "./models/user"

let dbConnection = null;
async function connect() {
    return await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'order-book-db',
        entities: [User, Trades],
        synchronize: true,
        logging: true,
    });
}

export const initDb = async () => {
    dbConnection = await connect();
}

export default dbConnection;

export async function close() {
    const connection = getConnection();
    await connection.close();
}