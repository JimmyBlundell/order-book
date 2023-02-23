import { Router } from 'express';
import { createTrade, getUserTrades, getTrades } from '../controllers/trades';

const router = Router();

router.post('/createTrade', createTrade);
router.get('/getTrades', getTrades);
router.get('/getFeeds/:user', getUserTrades);

export default router;