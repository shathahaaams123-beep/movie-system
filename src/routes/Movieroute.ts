import { Router } from "express";
import { createMovie, getMovies, getMovieById,updateMovie,deleteMovie,} from "../controllers/Moviecontroller";
import { validateMovie } from "../validators/Movievalidator";
const router = Router();

router.post("/", validateMovie, createMovie);
router.get("/", getMovies);
router.get("/:id", getMovieById);
router.put("/:id", validateMovie, updateMovie);
router.delete("/:id", deleteMovie);
export default router;



