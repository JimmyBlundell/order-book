/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
    const user = JSON.parse(localStorage.getItem('userInfo') as string);
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
    };

    const createOrder = async () => {
        await Axios.post('http://localhost:8000/createTrade', {
            user: parseInt(user.id),
            side: side,
            amount: parseInt(amount),
            amountType: amountType,
            price: parseInt(price),
            gtc: gtc,
            expiration: expiration
        }).then((response) => {
            console.log("response from create order: ", response?.data);
            resetFields();
        }).catch((err) => {
            alert(err?.response?.data);
        })
    };



    // const handleSubmit = (event: { preventDefault: () => void; }) => {
    //     event.preventDefault();

    //     const trade = {
    //         side,
    //         amount: amountType === 'shares' ? parseInt(amount) : parseFloat(amount),
    //         price: parseFloat(price),
    //         gtc,
    //         expiration: gtc ? null : expiration,
    //     };

    //     onAddTrade(trade);

    //     resetFields();
    // };

    return (
        <div className="App-header">
            <div className="card">
                <h2>Create Order</h2>
                <label style={{ float: 'left', display: 'block', marginTop: '15px', marginBottom: '15px' }}>
                    Side:
                    <select className="form-control" value={side} onChange={(e) => setSide(e.target.value)}>
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </select>
                </label>
                <div className="input-group">
                    <input
                        type="number"
                        className="form"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="input-group-append">
                        <select
                            className="form-control"
                            value={amountType}
                            onChange={(e) => setAmountType(e.target.value)}
                        >
                            <option value="dollars">Dollars</option>
                            <option value="shares">Shares</option>
                        </select>
                    </div>
                </div>
                <div className="input-group">
                    <input
                        type="number"
                        className="form"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <label style={{ float: 'left', display: 'block', margin: '1em 0' }}>
                    GTC:
                    <input type="checkbox" checked={gtc} onChange={(e) => setGtc(e.target.checked)} />
                </label>
                {!gtc && (
                    <label>
                        Expiration:
                        <input
                            type="date"
                            value={expiration}
                            onChange={(e) => setExpiration(e.target.value)}
                            style={{ width: '100%', marginBottom: "15px" }}
                        />
                    </label>
                )}
                <div className={'button-group'}>
                    <Button type="submit" size={'lg'} onClick={() => createOrder()}>
                        Submit
                    </Button>
                    &nbsp;
                    <Button type="button" onClick={() => resetFields()} size={'lg'}>
                        Clear
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OrderForm;