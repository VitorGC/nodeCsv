/*
  Warnings:

  - A unique constraint covering the columns `[cd_product]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code_bar]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "products_cd_product_key" ON "products"("cd_product");

-- CreateIndex
CREATE UNIQUE INDEX "products_code_bar_key" ON "products"("code_bar");
