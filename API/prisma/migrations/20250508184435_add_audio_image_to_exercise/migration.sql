/*
  Warnings:

  - You are about to drop the column `createdAt` on the `BreathingExercise` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `_BreathingExerciseToCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BreathingExerciseToCategory" DROP CONSTRAINT "_BreathingExerciseToCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_BreathingExerciseToCategory" DROP CONSTRAINT "_BreathingExerciseToCategory_B_fkey";

-- DropIndex
DROP INDEX "Category_name_key";

-- AlterTable
ALTER TABLE "BreathingExercise" DROP COLUMN "createdAt",
ADD COLUMN     "audioUrl" TEXT,
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "createdAt";

-- DropTable
DROP TABLE "_BreathingExerciseToCategory";

-- CreateTable
CREATE TABLE "_ExerciseCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ExerciseCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ExerciseCategories_B_index" ON "_ExerciseCategories"("B");

-- AddForeignKey
ALTER TABLE "_ExerciseCategories" ADD CONSTRAINT "_ExerciseCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "BreathingExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseCategories" ADD CONSTRAINT "_ExerciseCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
