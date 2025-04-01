-- CreateTable
CREATE TABLE "Anime" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "episodes" INTEGER NOT NULL,
    "realeseYear" INTEGER NOT NULL,
    "studio" TEXT NOT NULL,
    "genres" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);
