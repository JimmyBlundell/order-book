"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trades_1 = require("../controllers/trades");
const router = (0, express_1.Router)();
router.post('/createTrade', trades_1.createTrade);
router.get('/getTrades', trades_1.getTrades);
router.get('/getFeeds/:user', trades_1.getUserTrades);
exports.default = router;
