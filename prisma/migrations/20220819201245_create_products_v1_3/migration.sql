/*
  Warnings:

  - The primary key for the `products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `products` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "products_cd_product_key";

-- AlterTable
ALTER TABLE "products" DROP CONSTRAINT "products_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "products_pkey" PRIMARY KEY ("cd_product");
