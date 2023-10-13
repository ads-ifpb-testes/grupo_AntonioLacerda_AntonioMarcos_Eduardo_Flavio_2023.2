/*
  Warnings:

  - You are about to drop the column `idUser` on the `Ocurrency` table. All the data in the column will be lost.
  - Added the required column `public` to the `Ocurrency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Ocurrency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Ocurrency` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ocurrency" DROP CONSTRAINT "Ocurrency_idUser_fkey";

-- AlterTable
ALTER TABLE "Ocurrency" DROP COLUMN "idUser",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "public" BOOLEAN NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "location_idx" ON "Ocurrency" USING GIST ("location");

-- AddForeignKey
ALTER TABLE "Ocurrency" ADD CONSTRAINT "Ocurrency_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
