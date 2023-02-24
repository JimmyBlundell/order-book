import React, { useState } from 'react';
import { Trade } from './OrderBook';

type OrderFormProps = {
  onAddTrade: (trade: Trade) => void;
};

const OrderForm = ({ onAddTrade }: OrderFormProps) => {
  const [side, setSide] = useState('buy');
  const [amount, setAmount] = useState('');
  const [amountType, setAmountType] = useState('shares');
  const [price, setPrice] = useState('');
  const [gtc, setGtc] = useState(false);
  const [expiration, setExpiration] = useState('');

  function handleSubmit(event: any) {
    event.preventDefault();

    const trade = {
      side,
      amount: amountType === 'shares' ? parseInt(amount) : parseFloat(amount),
      price: parseFloat(price),
      gtc,
      expiration: gtc ? null : expiration
    };

    onAddTrade(trade);

    // Reset form fields
    setSide('buy');
    setAmount('');
    setAmountType('shares');
    setPrice('');
    setGtc(false);
    setExpiration('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Side:
        <select value={side} onChange={(event) => setSide(event.target.value)}>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </label>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <select
          value={amountType}
          onChange={(event) => setAmountType(event.target.value)}
        >
          <option value="shares">Shares</option>
          <option value="dollars">$</option>
        </select>
      </label>
      <label>
        Price:
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </label>
      <label>
        GTC:
        <input
          type="checkbox"
          checked={gtc}
          onChange={(event) => setGtc(event.target.checked)}
        />
      </label>
      {!gtc && (
        <label>
          Expiration:
          <input
            type="date"
            value={expiration}
            onChange={(event) => setExpiration(event.target.value)}
          />
        </label>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default OrderForm;
