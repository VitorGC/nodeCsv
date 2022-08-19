-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "code_bar" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
