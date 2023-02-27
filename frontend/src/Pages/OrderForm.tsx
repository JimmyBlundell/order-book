/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from 'react';
import ConfirmationModal from "../components/Modal";
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import Axios from 'axios';
import './Login.css';

const OrderForm = () => {
    const [showModal, setShowModal] = useState(false);
    const user = JSON.parse(localStorage.getItem('userInfo') as string);
    const [side, setSide] = useState('buy');
    const [amount, setAmount] = useState('');
    const [amountType, setAmountType] = useState('shares');
    const [price, setPrice] = useState('');
    const [gtc, setGtc] = useState(false);
    const [expiration, setExpiration] = useState('');

    // Keep track of new order to display in confirmation modal
    const newOrder = {
        side: side,
        amount: amount,
        amountType: amountType,
        price: price,
        gtc: gtc,
        expiration: expiration
    };

    const orderValidation = (user && side && amount && amountType && price && (gtc || expiration)) ? true : false;

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
        });
        setShowModal(false);
    };

    function ConfirmationModal(props: any) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Submit Order Confirmation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Please review your order</h4>
                    <table>
                        <tbody>
                            <tr>
                                <td>Side:</td>
                                <td>{side}</td>
                            </tr>
                            <tr>
                                <td>Amount:</td>
                                <td>{amount}</td>
                            </tr>
                            <tr>
                                <td>Amount Type:</td>
                                <td>{amountType}</td>
                            </tr>
                            <tr>
                                <td>Price/Share:</td>
                                <td>{price}</td>
                            </tr>
                            <tr>
                                <td>GTC:</td>
                                <td>{gtc ? 'Yes' : 'No'}</td>
                            </tr>
                            <tr>
                                <td>Expiration:</td>
                                <td>{expiration ? new Date(expiration).toLocaleString() : '-'}</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { createOrder(); setShowModal(false); }}>Submit</Button>
                    <Button onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

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
                            value={side === "sell" ? "shares" : amountType}
                            disabled={side === "sell"}
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
                        placeholder="Price/Share"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <label style={{ float: 'left', display: 'block', margin: '1em 0' }}>
                    GTC:
                    <input style={{ marginLeft: "8px" }} type="checkbox" checked={gtc} onChange={(e) => setGtc(e.target.checked)} />
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
                    <Button type="submit" size={'lg'} disabled={!orderValidation} onClick={() => setShowModal(true)}>
                        Submit
                    </Button>
                    &nbsp;
                    <Button type="button" onClick={() => resetFields()} size={'lg'}>
                        Clear
                    </Button>
                </div>
            </div>
            <ConfirmationModal show={showModal} />
        </div >
    );
};

export default OrderForm;