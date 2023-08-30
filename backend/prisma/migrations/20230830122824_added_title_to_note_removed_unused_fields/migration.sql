/*
  Warnings:

  - You are about to drop the column `priority` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "priority",
ADD COLUMN     "title" VARCHAR(50);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createDate",
DROP COLUMN "name";

-- DropEnum
DROP TYPE "Priority";
