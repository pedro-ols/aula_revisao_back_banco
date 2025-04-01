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
