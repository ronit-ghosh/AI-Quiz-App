-- CreateTable
CREATE TABLE "Stats" (
    "id" TEXT NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "answeredQuestions" INTEGER NOT NULL,
    "correctAnswers" INTEGER NOT NULL,
    "incorrectAnswers" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);
