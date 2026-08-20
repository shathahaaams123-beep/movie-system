import express from 'express';
import dotenv from 'dotenv';
import movieRoutes from './routes/Movieroute';
import showtimeRoutes from './routes/showtime.routes';
dotenv.config();

const app = express();

app.use(express.json());


app.use('/movies', movieRoutes);
app.use('/showtimes', showtimeRoutes);
app.get('/', (req, res) => {
  res.json({ message: "Movie System API is running" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});