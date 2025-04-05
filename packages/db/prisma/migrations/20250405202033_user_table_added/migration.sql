-- CreateTable
CREATE TABLE "User" (
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "photo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("clerkId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
