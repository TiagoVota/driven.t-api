/*
  Warnings:

  - You are about to drop the column `value` on the `HotelOption` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Modality` table. All the data in the column will be lost.
  - Added the required column `price` to the `Modality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Modality" DROP CONSTRAINT "Modality_hotelOptionId_fkey";

-- DropIndex
DROP INDEX "Ticket_modalityId_key";

-- AlterTable
ALTER TABLE "HotelOption" DROP COLUMN "value",
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Modality" DROP COLUMN "value",
ADD COLUMN     "price" INTEGER NOT NULL,
ALTER COLUMN "hotelOptionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "totalPrice" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Modality" ADD CONSTRAINT "Modality_hotelOptionId_fkey" FOREIGN KEY ("hotelOptionId") REFERENCES "HotelOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;
