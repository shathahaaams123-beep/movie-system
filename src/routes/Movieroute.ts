import { Router } from "express";
import { createMovie, getMovies, getMovieById,updateMovie,deleteMovie,} from "../controllers/Moviecontroller";
import { validateMovie } from "../validators/Movievalidator";
const router = Router();

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - genre
 *               - duration
 *               - description
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *               genre:
 *                 type: string
 *               duration:
 *                 type: number
 *               description:
 *                 type: string
 *               posterUrl:
 *                 type: string
 *               rating:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum:
 *                   - Now Showing
 *                   - Coming Soon
 *     responses:
 *       201:
 *         description: Movie created successfully
 *       400:
 *         description: Invalid movie data
 */

router.post("/", validateMovie, createMovie);
/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Movies retrieved successfully
 *       500:
 *         description: Failed to get movies
 */
router.get("/", getMovies);
/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie retrieved successfully
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Failed to get movie
 */
router.get("/:id", getMovieById);
/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               genre:
 *                 type: string
 *               duration:
 *                 type: number
 *               description:
 *                 type: string
 *               posterUrl:
 *                 type: string
 *               rating:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum:
 *                   - Now Showing
 *                   - Coming Soon
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       404:
 *         description: Movie not found
 *       400:
 *         description: Invalid movie data
 */
router.put("/:id", validateMovie, updateMovie);
/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Failed to delete movie
 */
router.delete("/:id", deleteMovie);
export default router;



