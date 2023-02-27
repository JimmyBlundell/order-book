import { getRepository } from 'typeorm';
import { Trades } from '../models/trades';

// POST /orders
export async function createTrade(req: any, res: any) {

  const tradeRepository = getRepository(Trades);

  const { user, side, amount, amountType, price, gtc, expiration } = req.body;

  // Create a new order object
  const newTrade = new Trades();
  newTrade.user = user;
  newTrade.side = side;
  newTrade.amount = amount;
  newTrade.amountType = amountType;
  newTrade.price = price;
  newTrade.gtc = gtc;

  // Set expiration date if it exists
  if (expiration) {
    newTrade.expiration = new Date(expiration);
  }

  // Save the new order to the database
  const savedTrade = await tradeRepository.save(newTrade);

  // Send the saved order back to the client
  res.json(savedTrade);
}

export async function getUserTrades(req: any, res: any) {
  // get trades for a specific user
  const user = req.params.user;
  if (!user) {
    res.status(400).send('Missing user info - please log in and try again');
    return;
  }
  try {
    const userTrades = await getRepository(Trades).find({ where: { user } });
    res.json(userTrades);
  } catch (err: any) {
    console.log("Error: ", err.message);
    res.send(err);
  }
}

export async function getTrades(req: any, res: any) {
  const tradeRepository = getRepository(Trades);
  // get all trades
  try {
    const trades = await tradeRepository.find();
    res.json(trades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}