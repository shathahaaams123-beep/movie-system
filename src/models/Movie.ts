export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: number;
  status: "Now Showing" | "Coming Soon";
}