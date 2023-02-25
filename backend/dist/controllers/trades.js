"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrades = exports.getUserTrades = exports.createTrade = void 0;
const typeorm_1 = require("typeorm");
const trades_1 = require("../models/trades");
// POST /orders
function createTrade(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tradeRepository = (0, typeorm_1.getRepository)(trades_1.Trades);
        const { user, side, amount, amountType, price, gtc, expiration } = req.body;
        // Create a new order object
        const newTrade = new trades_1.Trades();
        newTrade.user = user;
        newTrade.side = side;
        newTrade.amount = amount;
        newTrade.amountType = amountType;
        newTrade.price = price;
        newTrade.gtc = gtc;
        // Set expiration date if it exists
        if (expiration) {
            newTrade.expiration = new Date(expiration);
        }
        // Save the new order to the database
        const savedTrade = yield tradeRepository.save(newTrade);
        // Send the saved order back to the client
        res.json(savedTrade);
    });
}
exports.createTrade = createTrade;
function getUserTrades(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // get trades for a specific user
        const user = req.params.user;
        if (!user) {
            res.status(400).send('Missing user info - please log in and try again');
            return;
        }
        try {
            const userTrades = yield (0, typeorm_1.getRepository)(trades_1.Trades).find({ where: { user } });
            res.json(userTrades);
        }
        catch (err) {
            console.log("Error: ", err.message);
            res.send(err);
        }
    });
}
exports.getUserTrades = getUserTrades;
function getTrades(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tradeRepository = (0, typeorm_1.getRepository)(trades_1.Trades);
        // get all trades
        try {
            const trades = yield tradeRepository.find();
            res.json(trades);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
}
exports.getTrades = getTrades;
