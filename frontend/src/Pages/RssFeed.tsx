// import React, {useState, useEffect} from 'react';
// import {Button, Card, Dropdown, DropdownButton} from "react-bootstrap";
// import Parser from 'rss-parser';

// type RssFeedProps = {
//     url: string
// }

// const goToLink = (url: string) => {
//     window.location.href = url;
// }

// const RssFeed = ({url}: RssFeedProps) => {

//     // will run into cors errors if this is not prepended on the rss feed url
//     // TODO: find better way to proxy avoid cors?
//     const proxy = "https://cors-anywhere.herokuapp.com/";

//     // state to keep track of how we sort the feeds
//     const [selectedSortCriteria, setSelectedSortCriteria] = useState<string>("pubDate");
//     const [feeds, setFeeds] = useState<Array<any>>([]);

//     // fetch new content each time url changes
//     useEffect(() => {
//         const fetchData = async () => {
//             const parser = new Parser();
//             const feed = await parser.parseURL(`${proxy}${url}`);
//             const sortedFeeds = feed.items.sort((a, b) => {
//                 // sort by date
//                 if (selectedSortCriteria === 'date') {
//                     // @ts-ignore
//                     return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
//                 }

//                 // sort by title
//                 if (selectedSortCriteria === 'title') {
//                     // @ts-ignore
//                     return a.title.localeCompare(b.title);
//                 }

//                 // sort by description
//                 if (selectedSortCriteria === 'description') {
//                     return a.contentSnippet && b.contentSnippet ? a.contentSnippet.localeCompare(b.contentSnippet) : 0;
//                 }

//                 // by default, return the feed items in their original order
//                 return 0;
//             });

//             setFeeds(sortedFeeds);
//         }
//         fetchData().then(() => {
//         });
//     }, [url, selectedSortCriteria]);


//     return (
//         <div style={{width: "80%"}}>
//             <DropdownButton style={{marginBottom: "20px"}} title={"Sort Feeds By:"}>
//                 <Dropdown.Item
//                     onClick={() => {
//                         setSelectedSortCriteria("pubDate");
//                     }}
//                 >
//                     Published Date
//                 </Dropdown.Item>
//                 <Dropdown.Item
//                     onClick={() => {
//                         setSelectedSortCriteria("title");
//                     }}
//                 >
//                     Title
//                 </Dropdown.Item>
//                 <Dropdown.Item
//                     onClick={() => {
//                         setSelectedSortCriteria("description");
//                     }}
//                 >
//                     Description
//                 </Dropdown.Item>

//             </DropdownButton>
//             {feeds.map((feed, index) => {
//                 let image = null;
//                 if (feed.enclosure && feed.enclosure.url) {
//                     image = <img src={feed.enclosure.url} alt={feed.title} height={"200"} width={"200"}/>
//                 }
//                 return (
//                     <Card style={{marginBottom: "15px"}} key={index}>
//                         <Card.Title style={{padding: "20px"}}>{feed.title}</Card.Title>
//                         <Card.Title style={{padding: "20px"}}>{feed.pubDate}</Card.Title>
//                         {image}
//                         <Card.Body>
//                             <p>{feed.description}</p>
//                             <p>{feed.contentSnippet}</p>
//                             <p>{feed.creator}</p>
//                             <Button variant="primary" onClick={() => {goToLink(feed.link)}}>
//                                 Open
//                             </Button>{" "}
//                         </Card.Body>
//                     </Card>
//                 );
//             })}
//         </div>
//     );
// }

// export default RssFeed;

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from 'react';
import { Trade } from './OrderBook';
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
                    <Button type="submit" size={'lg'} onClick={() => { createOrder(); onAddTrade }}>
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