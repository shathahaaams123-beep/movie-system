import { Router } from 'express';
import {
  getAllMovies,
  getMovieById,
  createMovie
} from "../controllers/Moviecontroller";
const router = Router();

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', createMovie);

export default router;