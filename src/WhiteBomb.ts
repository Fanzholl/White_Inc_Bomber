import Express from "express";
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
import revengeRouter from "./routers/Revenge.ts";
import { getRecaptchaResponse } from "./captcha/getAdamasCaptcha.js";

const app = Express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(Express.static(path.join(__dirname, "sites")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "sites", "index.html"));
});

app.use(Express.json());
app.use('/revenge', revengeRouter);

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});