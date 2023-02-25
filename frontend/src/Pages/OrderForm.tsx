import React, { useState } from 'react';
import { Trade } from './OrderBook';
import FormInput from '../components/form-input/form-input';
import { Button } from 'react-bootstrap';
import Axios from 'axios';
import './Login.css';

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

    const resetFields = () => {
        setSide('buy');
        setAmount('');
        setAmountType('shares');
        setPrice('');
        setGtc(false);
        setExpiration('');
    }

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

        resetFields();

    }

    return (
        <div className="App-header">
            <div className="card">
                <h2>Create Order</h2>
                <label style={{ float: "left", display: 'block', marginTop: '15px', marginBottom: "15px" }}>
                    Side:
                    <select className="form-control" value={side} onChange={(e) => setSide(e.target.value)}>
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </select>
                </label>
                <div className="input-group">
                    <input type="number" className="form" placeholder="Amount" />
                    <div className="input-group-append">
                        <select className="form-control">
                            <option>Dollars</option>
                            <option>Shares</option>
                        </select>
                    </div>
                </div>
                <div className="input-group">
                    <input type="number" className="form" placeholder="Price" />
                </div>
                <label style={{ float: "left", display: 'block', margin: '1em 0' }}>
                    GTC:
                    <input type="checkbox" checked={gtc} onChange={(e) => setGtc(e.target.checked)} />
                </label>
                <div className={'button-group'}>
                    <Button
                        type="submit"
                        onClick={(e) => { console.log("e", e); }}
                        size={'lg'}
                    >
                        Submit
                    </Button>
                    &nbsp;
                    <Button type="button" onClick={() => { resetFields() }} size={'lg'}>
                        Clear
                    </Button>
                </div>
            </div >
        </div >
    );
};

export default OrderForm;