import React from 'react';
import { Trade } from './OrderBook';

const TradeTable = (props: { trades: Trade[] }) => {
  const { trades } = props;
  console.log("trades in trades table component: ", trades);
  return (
    <table className="trades-table">
      <thead>
        <tr>
          <th>Side</th>
          <th>Amount</th>
          <th>Amount Type</th>
          <th>Price</th>
          <th>GTC</th>
          <th>Expiration</th>
        </tr>
      </thead>
      <tbody>
        {trades && trades.map((trade, i) => (
          <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f2f2f2' : 'transparent' }}>
            <td>{trade.side}</td>
            <td>{trade.amount}</td>
            <td>{trade.amountType}</td>
            <td>{trade.price}</td>
            <td>{trade.gtc ? 'Yes' : 'No'}</td>
            <td>{trade.expiration || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TradeTable;
