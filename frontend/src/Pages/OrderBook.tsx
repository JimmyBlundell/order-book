import React, { useState } from 'react';
import TradeTable from './TradeTable';
import OrderForm from './OrderForm';

export interface Trade {
  side: string;
  amount: number;
  price: number;
  gtc: boolean;
  expiration: Date | any;
}

const OrderBook = () => {
  const [trades, setTrades] = useState<Trade[]>([]);

  function handleAddTrade(trade: Trade) {
    setTrades([...trades, trade]);
  }

  return (
    <div>
      <h1>Order Book</h1>
      <TradeTable trades={trades} />
      <OrderForm onAddTrade={handleAddTrade} />
    </div>
  );
};

export default OrderBook;
