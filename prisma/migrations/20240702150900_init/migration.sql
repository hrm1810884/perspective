-- CreateTable
CREATE TABLE "Diary" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diary" TEXT NOT NULL,

    CONSTRAINT "Diary_pkey" PRIMARY KEY ("id")
);
