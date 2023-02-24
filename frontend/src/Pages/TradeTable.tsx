import React from 'react';
import { Trade } from './OrderBook';

const TradeTable = (props: { trades: Trade[] }) => {
  const { trades } = props;
  return (
    <table>
      <thead>
        <tr>
          <th>Side</th>
          <th>Amount</th>
          <th>Price</th>
          <th>GTC</th>
          <th>Expiration</th>
        </tr>
      </thead>
      <tbody>
        {trades.map((trade, i) => (
          <tr key={i}>
            <td>{trade.side}</td>
            <td>{trade.amount}</td>
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
