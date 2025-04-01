# Tutorial: Criando um Backend Node.js para Gerenciamento de Animes

Este tutorial vai te guiar na criação de uma API REST para gerenciar uma coleção de animes, utilizando Node.js com Express. Vamos construir um CRUD completo seguindo uma arquitetura organizada com routes, controllers e models, usando um array em memória para armazenar os dados.

## Capacidades Técnicas Trabalhadas

- Utilizar paradigma da programação orientada a objetos
- Definir os elementos de entrada, processamento e saída para a programação da aplicação web
- Utilizar design patterns no desenvolvimento da aplicação web
- Definir os frameworks a serem utilizados no desenvolvimento da aplicação web
- Desenvolver API (web services) para integração de dados entre plataformas

## Pré-requisitos

- Node.js instalado (versão 18 ou superior)
- Um editor de código (VS Code recomendado)
- Conhecimentos básicos de JavaScript e Node.js

## Vamos começar!

### Passo 1: Inicializar o projeto

Crie uma pasta para o projeto e inicialize:

```bash
mkdir animes-api
cd animes-api
npm init
```

### Passo 2: Instalar dependências

```bash
npm install express nodemon dotenv
```

### Passo 3: Configurar o arquivo package.json

Modifique o arquivo `package.json` para incluir os scripts:

```json
{
  "name": "animes-api",
  "version": "1.0.0",
  "description": "Projeto base de uma API com MVC",
  "keywords": ["nodejs", "javascript", "prisma"],
  "license": "MIT",
  "author": "Felipe Dev",
  "type": "module",
  "main": "src/server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "dotenv": "^16.4.7",
    "express": "^5.1.0",
    "nodemon": "^3.1.9"
  }
}
```

### Passo 4: Criar o arquivo .gitignore

Adicionar o seguinte conteúdo ao arquivo `.gitignore`:

```
node_modules
.env
```

### Passo 5: Configurar o ambiente com dotenv

Crie um arquivo `.env` na raiz do projeto:

```
PORT=4000
```

### Passo 6: Criar o servidor Express

Crie o arquivo `src/server.js`:

```javascript
import express from "express";
import { config } from "dotenv";

config(); // Carrega variáveis de ambiente do arquivo .env
const port = process.env.PORT || 3000;

// Inicializa o Express
const app = express();

app.use(express.json()); // Parse de JSON

// Rota base para verificar se o servidor está rodando
app.get("/", (req, res) => {
  res.json({ message: "API de Coleção de Animes funcionando!" });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
```

### Passo 7: Criar o modelo Anime (usando array em memória)

Crie o arquivo `src/models/animeModel.js`:

```javascript
// Array para armazenar os animes em memória
let animes = [
  {
    id: 1,
    title: "Attack on Titan",
    description: "Humanidade lutando contra titãs em um mundo pós-apocalíptico",
    episodes: 75,
    releaseYear: 2013,
    studio: "MAPPA",
    genres: "Ação,Drama,Fantasia",
    rating: 4.8,
    imageUrl: "https://example.com/aot.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "My Hero Academia",
    description:
      "Em um mundo onde quase todos possuem superpoderes, um garoto sem poderes luta para se tornar um herói",
    episodes: 113,
    releaseYear: 2016,
    studio: "Bones",
    genres: "Ação,Comédia,Super-heróis",
    rating: 4.6,
    imageUrl: "https://example.com/mha.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Variável para controlar o próximo ID
let nextId = 3;

class AnimeModel {
  // Obter todos os animes
  findAll() {
    return animes;
  }

  // Obter um anime pelo ID
  findById(id) {
    return animes.find((anime) => anime.id === Number(id)) || null;
  }

  // Criar um novo anime
  create(
    title,
    description,
    episodes,
    releaseYear,
    studio,
    genres,
    rating,
    imageUrl
  ) {
    const newAnime = {
      id: nextId++,
      title,
      description,
      episodes,
      releaseYear,
      studio,
      genres,
      rating,
      imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    animes.push(newAnime);
    return newAnime;
  }

  // Atualizar um anime
  update(
    id,
    title,
    description,
    episodes,
    releaseYear,
    studio,
    genres,
    rating,
    imageUrl
  ) {
    const anime = this.findById(id);

    if (!anime) {
      return null;
    }

    // Atualize o anime existente com os novos dados
    anime.title = title || anime.title;
    anime.description = description || anime.description;
    anime.episodes = episodes || anime.episodes;
    anime.releaseYear = releaseYear || anime.releaseYear;
    anime.studio = studio || anime.studio;
    anime.genres = genres || anime.genres;
    anime.rating = rating || anime.rating;
    anime.imageUrl = imageUrl || anime.imageUrl;
    anime.updatedAt = new Date(); // Atualiza a data de modificação

    return anime;
  }

  // Remover um anime
  delete(id) {
    const anime = this.findById(id);
    if (!anime) {
      return null;
    }

    // Filtra o anime a ser removido
    animes = animes.filter((anime) => anime.id !== Number(id));

    return true;
  }
}

export default new AnimeModel();
```

### Passo 8: Criar o controlador de Animes

Crie o arquivo `src/controllers/animeController.js`:

```javascript
import AnimeModel from "../models/animeModel.js";

class AnimeController {
  // GET /api/animes
  getAllAnimes(req, res) {
    try {
      const animes = AnimeModel.findAll();
      res.json(animes);
    } catch (error) {
      console.error("Erro ao buscar animes:", error);
      res.status(500).json({ error: "Erro ao buscar animes" });
    }
  }

  // GET /api/animes/:id
  getAnimeById(req, res) {
    try {
      const { id } = req.params;

      const anime = AnimeModel.findById(id);

      if (!anime) {
        return res.status(404).json({ error: "Anime não encontrado" });
      }

      res.json(anime);
    } catch (error) {
      console.error("Erro ao buscar anime:", error);
      res.status(500).json({ error: "Erro ao buscar anime" });
    }
  }

  // POST /api/animes
  createAnime(req, res) {
    try {
      // Validação básica
      const {
        title,
        description,
        episodes,
        releaseYear,
        studio,
        genres,
        rating,
        imageUrl,
      } = req.body;

      // Verifica se o título do anime foi fornecido

      if (
        !title ||
        !description ||
        !episodes ||
        !releaseYear ||
        !studio ||
        !genres ||
        !rating ||
        !imageUrl
      ) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      // Criar o novo anime
      const newAnime = AnimeModel.create(
        title,
        description,
        episodes,
        releaseYear,
        studio,
        genres,
        rating,
        imageUrl
      );

      if (!newAnime) {
        return res.status(400).json({ error: "Erro ao criar anime" });
      }

      res.status(201).json(newAnime);
    } catch (error) {
      console.error("Erro ao criar anime:", error);
      res.status(500).json({ error: "Erro ao criar anime" });
    }
  }

  // PUT /api/animes/:id
  updateAnime(req, res) {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        episodes,
        releaseYear,
        studio,
        genres,
        rating,
        imageUrl,
      } = req.body;

      // Atualizar o anime
      const updatedAnime = AnimeModel.update(
        id,
        title,
        description,
        episodes,
        releaseYear,
        studio,
        genres,
        rating,
        imageUrl
      );

      if (!updatedAnime) {
        return res.status(404).json({ error: "Anime não encontrado" });
      }

      res.json(updatedAnime);
    } catch (error) {
      console.error("Erro ao atualizar anime:", error);
      res.status(500).json({ error: "Erro ao atualizar anime" });
    }
  }

  // DELETE /api/animes/:id
  deleteAnime(req, res) {
    try {
      const { id } = req.params;

      // Remover o anime
      const result = AnimeModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Anime não encontrado" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover anime:", error);
      res.status(500).json({ error: "Erro ao remover anime" });
    }
  }
}

export default new AnimeController();
```

### Passo 9: Criar as rotas

Crie o arquivo `src/routes/animeRoutes.js`:

```javascript
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
```

### Passo 10: Iniciar o servidor

```bash
npm run dev
```

## Testando a API

Agora você pode testar o CRUD completo usando ferramentas como Postman, Insomnia ou Thunder Client:

### 1. Criar um anime (POST /api/animes)

```json
{
  "title": "Naruto Shippuden",
  "description": "Naruto Uzumaki retorna após três anos de treinamento para enfrentar a Akatsuki",
  "episodes": 500,
  "releaseYear": 2007,
  "studio": "Pierrot",
  "genres": "Ação,Aventura,Comédia,Shounen",
  "rating": 4.8,
  "imageUrl": "https://example.com/naruto.jpg"
}
```

### 2. Listar todos os animes (GET /api/animes)

### 3. Obter um anime específico (GET /api/animes/:id)

### 4. Atualizar um anime (PUT /api/animes/:id)

```json
{
  "episodes": 502,
  "rating": 4.9
}
```

### 5. Remover um anime (DELETE /api/animes/:id)

## Explicação do Projeto

Neste projeto, seguimos algumas boas práticas de desenvolvimento:

1. **Arquitetura MVC (Model-View-Controller)**:

   - Models: Encapsulam a lógica de acesso aos dados (em memória nesse caso)
   - Controllers: Gerenciam a lógica de negócios
   - (Sem Views, pois é uma API)

2. **Organização de código**:

   - Estrutura de pastas bem definida
   - Separação de responsabilidades
   - Código modular e reutilizável

3. **Armazenamento em memória**:

   - Utilização de arrays para armazenar dados temporários
   - Gestão de IDs para garantir unicidade
   - Simulação de operações assíncronas (async/await) para facilitar expansão futura

4. **Tratamento de erros**:

   - Try/catch blocks para lidar com exceções
   - Respostas de erro padronizadas

5. **Validação de dados**:
   - Validação básica implementada nos controllers
   - Pode ser aprimorada com bibliotecas como Joi ou Zod

## Considerações Finais

Este projeto é uma base simplificada que usa armazenamento em memória. Em uma aplicação real, você provavelmente usaria um banco de dados como MongoDB ou PostgreSQL com Prisma ou outro ORM.

O armazenamento em memória tem limitações importantes:

- Os dados são perdidos quando o servidor é reiniciado
- Não é escalável para múltiplas instâncias do servidor
- Não é adequado para dados persistentes em produção

Para expandir este projeto, você poderia adicionar:

- Autenticação e autorização
- Paginação de resultados
- Testes automatizados
- Documentação da API com Swagger
- Persistência com um banco de dados real
