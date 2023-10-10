/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "OcurrencyType" AS ENUM ('theft', 'robbery', 'sexualHarassment', 'kidnapping', 'vandalism', 'other');

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Ocurrency" (
    "id" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "OcurrencyType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" geometry(Point, 4326) NOT NULL,

    CONSTRAINT "Ocurrency_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ocurrency" ADD CONSTRAINT "Ocurrency_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
