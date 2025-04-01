import express from "express";
import { config } from "dotenv";

import personagensRouter from "./routes/personageRoutes.js";

config(); // Carrega variáveis de ambiente do arquivo .env
const port = process.env.PORT || 4001;

// Inicializa o Express
const app = express();

app.use(express.json()); // Parse de JSON

app.use("/personagens", personagensRouter); // Usar as rotas de personagens

// Rota base para verificar se o servidor está rodando
app.get("/", (req, res) => {
  res.json({ message: "API de Coleção de personagens funcionando!" });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
