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
        <form onSubmit={handleSubmit} style={{ width: '50%', margin: '0 auto', textAlign: 'center' }}>
            <label style={{ float: "left", display: 'block', margin: '1em 0' }}>
                Side:
                <select value={side} onChange={(e) => setSide(e.target.value)}>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                </select>
            </label>
            <label style={{ display: 'block', margin: '1em 0' }}>
                Amount:
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount((e.target.value))}
                    style={{ width: '100%' }}
                />
            </label>
            <label style={{ display: 'block', margin: '1em 0' }}>
                Price:
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice((e.target.value))}
                    style={{ width: '100%' }}
                />
            </label>
            <label style={{ float: "left", display: 'block', margin: '1em 0' }}>
                Good 'til Canceled:
                <input type="checkbox" checked={gtc} onChange={(e) => setGtc(e.target.checked)} />
            </label>
            {!gtc && (
                <label style={{ display: 'block', margin: '1em 0' }}>
                    Expiration:
                    <input
                        type="date"
                        value={expiration}
                        onChange={(e) => setExpiration(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </label>
            )}
            <button type="submit">Submit</button>
        </form>
    );
};

export default OrderForm;