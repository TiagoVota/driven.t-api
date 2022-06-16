/*
  Warnings:

  - You are about to drop the column `eventDayId` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `eventDayId` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_eventDayId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "eventDayId";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "eventDayId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_eventDayId_fkey" FOREIGN KEY ("eventDayId") REFERENCES "EventDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
