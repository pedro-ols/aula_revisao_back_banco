import prisma from "../../prisma/prisma.js";

class PersonagemModel {
  // Obter todos os personagens
  async findAll() {
    const personagens = await prisma.personagem.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return personagens;
  }

  // Obter um personagem pelo ID
  async findById(id) {
    const personagem = await prisma.personagem.findUnique({
      where: {
        id: Number(id),
      },
    });

    return personagem;
  }

  // Criar um novo personagem
  async create(name, description, age, power, anime) {
    const newPersonagem = await prisma.personagem.create({
      data: {
        name,
        description,
        age,
        power,
        anime,
      },
    });

    return newPersonagem;
  }

  // Atualizar um personagem
  async update(name, description, age, power, anime) {
    const personagem = await this.findById(id);

    if (!personagem) {
      return null;
    }

    // Atualize o personagem existente com os novos dados
    const data = {};
    if (name !== undefined) {
      data.name = name;
    }
    if (description !== undefined) {
      data.description = description;
    }
    if (age !== undefined) {
      data.age = age;
    }
    if (power !== undefined) {
      data.power = power;
    }
    if (anime !== undefined) {
      data.anime = anime;
    }
    
    const personagemUpdated = await prisma.personagem.update({
      where: {
        id: Number(id),
      },
      data,
    });

    return personagemUpdated;
  }

  // Remover um personagem
  async delete(id) {
    const personagem = await this.findById(id);

    if (!personagem) {
      return null;
    }

    await prisma.personagem.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new PersonagemModel();
