import { MovieModel } from "../models/movie.models.js";

export const getMovies = async (req, res) => {
  try {
    const movies = await MovieModel.findAll();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos", error });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movie = await MovieModel.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: "Pelicula no encontrada" });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const createMovie = async (req, res) => {
  const { title, genre, duration, year, synopsis } = req.body;

  if (!title || !genre || !duration || !year) return res.status(400).json({ message: "Faltan datos obligatorios" });
  if (!Number.isInteger(duration) || duration <= 0) return res.status(400).json({ message: "Duracion invalida" });
  if (!Number.isInteger(year) || year < 1888 || year > new Date().getFullYear()) return res.status(400).json({ message: "Año invalido" });
  if (synopsis && typeof synopsis !== "string") return res.status(400).json({ message: "Sinopsis invalida" });

  try {
    const exists = await MovieModel.findOne({ where: { title } });
    if (exists) return res.status(400).json({ message: "Ya existe un registro con ese titulo" });

    const newMovie = await MovieModel.create(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: "Error al crear la pelicula", error });
  }
};

export const updateMovie = async (req, res) => {
  const { title, genre, duration, year, synopsis } = req.body;

  if (!title || !genre || !duration || !year) return res.status(400).json({ message: "Faltan datos obligatorios" });
  if (!Number.isInteger(duration) || duration <= 0) return res.status(400).json({ message: "Duracion invalida" });
  if (!Number.isInteger(year) || year < 1888 || year > new Date().getFullYear()) return res.status(400).json({ message: "Año invalido" });
  if (synopsis && typeof synopsis !== "string") return res.status(400).json({ message: "Sinopsis invalida" });

  try {
    const movie = await MovieModel.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: "Pelicula no encontrada" });

    const exists = await MovieModel.findOne({ where: { title } });
    if (exists && exists.id !== Number(req.params.id)) return res.status(400).json({ message: "Ya existe un registro con ese titulo" });

    await movie.update(req.body);
    res.json({ message: "Pelicula actualizada", movie });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar", error });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movie = await MovieModel.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: "Pelicula no encontrada" });

    await movie.destroy();
    res.json({ message: "Pelicula eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar", error });
  }
};