import { Router, Response, Request } from "express";
import { Readable } from "stream"
import readline from "readline";

import multer from "multer";

const multerConfig = multer();

const router = Router();

router.post(
    "/products",
    multerConfig.single("file"),
    async (request: Request, response: Response) => {
        const { file } = request;
        const  buffer  = file;

        const readableFile = new Readable();
        readableFile.push(buffer);
        readableFile.push(null);

        const productsLine = readline.createInterface({
            input: readableFile
        })

        for await(let line of productsLine) {
            console.log(line);
        }
        return response.send();
    }
);

export { router };