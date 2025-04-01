import express from "express";
import { config } from "dotenv";

import router from "./routes/animeRoutes.js";

config(); // Carrega variáveis de ambiente do arquivo .env
const port = process.env.PORT || 3000;

// Inicializa o Express
const app = express();

app.use(express.json()); // Parse de JSON
app.use(router); // Usar as rotas definidas

app.use("/animes", router); // Usar as rotas de animes

// Rota base para verificar se o servidor está rodando
app.get("/", (req, res) => {
  res.json({ message: "API de Coleção de Animes funcionando!" });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
