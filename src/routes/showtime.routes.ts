import { Router } from 'express';
import { getAllShowtimes, createShowtime } from '../controllers/showtime.controller';

const router = Router();

router.get('/', getAllShowtimes);
router.post('/', createShowtime);

export default router;