import express from "express";
import AnimeController from "../controllers/animeController.js";

const router = express.Router();

// Rotas de Animes
// GET /api/animes - Listar todos os animes
router.get("/", AnimeController.getAllAnimes);

// GET /api/animes/:id - Obter um anime pelo ID
router.get("/:id", AnimeController.getAnimeById);

// POST /api/animes - Criar um novo anime
router.post("/", AnimeController.createAnime);

// PUT /api/animes/:id - Atualizar um anime
router.put("/:id", AnimeController.updateAnime);

// DELETE /api/animes/:id - Remover um anime
router.delete("/:id", AnimeController.deleteAnime);

export default router;
