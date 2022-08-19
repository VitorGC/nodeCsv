import { Router, Response, Request } from "express";
import { Readable } from "stream"
import readline from "readline";

import multer from "multer";
import { client } from "./database/client";

const multerConfig = multer();

const router = Router();

interface Product {
    cd_product: string;
    code_bar: string;
    description: string;
    weight: number;
    quantity: number;
}

router.post(
    "/products",
    multerConfig.single("file"),
    async (request: Request, response: Response) => {
        const { file } = request;
        //const { buffer } = file; //Não é mais uma propriedade de file
        const buffer = file?.buffer

        const readableFile = new Readable();
        readableFile.push(buffer);
        readableFile.push(null);

        const productsLine = readline.createInterface({
            input: readableFile
        });

        const products: Product[] = [];

        for await(let line of productsLine) {
            const productLineSplit = line.split(',');
            //console.log(productLineSplit);
            products.push({
                cd_product: productLineSplit[0],
                code_bar: productLineSplit[1],
                description: productLineSplit[2],
                weight: Number(productLineSplit[3]),
                quantity: Number(productLineSplit[4]),
            });
        }

        for await( let {cd_product, code_bar, description, weight, quantity} of products){
            //const uniqueCd = cd_product
            await client.products.create({
                data: {
                    cd_product,
                    code_bar,
                    description,
                    weight,
                    quantity,
                },
            });
        }
        
        return response.json(products);
    }
);

router.get('/listProducts', async (req, res) => {
    const listProducts = await client.products.findMany({
    })
    res.json(listProducts)
});

router.get('/searchProducts/:id', async (req, res) => {
    const { id } = req.params
    const searchProducts = await client.products.findFirst({
        where: {
            id: Number(id),
        }
    })
    res.json(searchProducts)
});
/*
router.put('/publish/:id', async (req, res) => {
    const { id } = req.params
    const post = await client.products.update({
      where: { id: Number(id) },
      data: { published: true },
    })
    res.json(post)
});
*/
router.delete(`/delete/:id`, async (req, res) => {
    const { id } = req.params
    const post = await client.products.delete({
      where: {
        id: Number(id),
      },
    })
    res.json(post)
});


export { router };