/*
  Warnings:

  - You are about to drop the column `owner_id` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `owner_type` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `profile_id` on the `Media` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Media" DROP COLUMN "owner_id",
DROP COLUMN "owner_type",
DROP COLUMN "profile_id";
