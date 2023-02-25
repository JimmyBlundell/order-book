import React, { useEffect, useState } from 'react';
import TradeTable from './TradeTable';
import OrderForm from './OrderForm';
import axios from 'axios';

export interface Trade {
  side: string;
  amount: number;
  amountType: string;
  price: number;
  gtc: boolean;
  expiration: Date | any;
}

const OrderBook = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') as string);
  const userId = userInfo?.id;
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const { data } = await axios.get(`http://localhost:8000/getTrades`);
          console.log("data from call: ", data);
          setTrades(data);
        } catch (error) {
          console.log(error);
        }
      }
      else {
        return;
      }
    }
    fetchData().then(() => console.log("Fetched trades on page load"));
  }, []);

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
