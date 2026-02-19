-- CreateTable
CREATE TABLE "Clube" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clubeId" TEXT NOT NULL,
    CONSTRAINT "User_clubeId_fkey" FOREIGN KEY ("clubeId") REFERENCES "Clube" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Desbravador" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "dataNascimento" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clubeId" TEXT NOT NULL,
    "classeId" TEXT,
    CONSTRAINT "Desbravador_clubeId_fkey" FOREIGN KEY ("clubeId") REFERENCES "Clube" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Desbravador_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "Classe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Classe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clubeId" TEXT NOT NULL,
    "instrutorId" TEXT,
    CONSTRAINT "Classe_clubeId_fkey" FOREIGN KEY ("clubeId") REFERENCES "Clube" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Classe_instrutorId_fkey" FOREIGN KEY ("instrutorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Requisito" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "classeId" TEXT NOT NULL,
    CONSTRAINT "Requisito_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "Classe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Progresso" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "concluido" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "desbravadorId" TEXT NOT NULL,
    "requisitoId" TEXT NOT NULL,
    CONSTRAINT "Progresso_desbravadorId_fkey" FOREIGN KEY ("desbravadorId") REFERENCES "Desbravador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Progresso_requisitoId_fkey" FOREIGN KEY ("requisitoId") REFERENCES "Requisito" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Progresso_desbravadorId_requisitoId_key" ON "Progresso"("desbravadorId", "requisitoId");
