/*
  Warnings:

  - A unique constraint covering the columns `[isWanted]` on the table `HotelOption` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Modality_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "HotelOption_isWanted_key" ON "HotelOption"("isWanted");
