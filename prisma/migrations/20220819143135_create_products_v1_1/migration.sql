/*
  Warnings:

  - Added the required column `cd_product` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "cd_product" TEXT NOT NULL;
