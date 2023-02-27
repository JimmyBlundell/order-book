import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './OrderBook.css';
import TradeTable from './TradeTable';

export interface Trade {
  id: number;
  side: 'buy' | 'sell';
  amount: number;
  amountType: 'USD' | 'ETH';
  price: number;
  gtc: boolean;
  expiration?: Date;
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

  const buyOrders = trades.filter((trade) => trade.side === 'buy');
  const sellOrders = trades.filter((trade) => trade.side === 'sell');

  const sortedBuyOrders = React.useMemo(() => {
    return buyOrders.sort((a, b) => b.price - a.price);
  }, [buyOrders]);

  const sortedSellOrders = React.useMemo(() => {
    return sellOrders.sort((a, b) => a.price - b.price);
  }, [sellOrders]);

  return (
    <div className="order-book-container">
      <div className="buy-orders">
        <h2 className={"header-buy"}>Buy Orders</h2>
        <TradeTable trades={sortedBuyOrders} isBuySide={true} />
      </div>
      <div className="sell-orders">
        <h2 className={"header-sell"}>Sell Orders</h2>
        <TradeTable trades={sortedSellOrders} isBuySide={false} />
      </div>
    </div>
  );
};

export default OrderBook;